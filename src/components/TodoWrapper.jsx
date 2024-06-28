import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { listarTasks, adicionarTask, editarTask, deletarTaskPorId, recuperarTaskPorId } from '../service/TaskService';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [foundTask, setFoundTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await listarTasks();
        // Ordenar as tarefas por ID
        const sortedData = data.sort((a, b) => a.id - b.id);
        setTodos(sortedData);
      } catch (error) {
        console.error('Erro ao buscar tasks', error);
        setError(error.response ? error.response.data : 'Erro ao buscar tasks');
      }
    };

    fetchTasks();
  }, []);

  const addTodo = async (description, complete, priority, dueDate) => {
    setError('');
    const newTask = {
      descricao: description,
      completa: complete,
      prazo: dueDate,
      priority
    };

    try {
      await adicionarTask(newTask);
      const data = await listarTasks();
      // Ordenar as tarefas por ID
      const sortedData = data.sort((a, b) => a.id - b.id);
      setTodos(sortedData);
    } catch (error) {
      console.error('Erro ao adicionar task', error);
      setError(error.response ? error.response.data : 'Erro ao adicionar task');
    }
  };

  const deleteTodo = async (id) => {
    setError('');
    // Remover a tarefa do estado local antes de chamar a API
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);

    try {
      await deletarTaskPorId(id);
    } catch (error) {
      console.error('Erro ao deletar task', error);
      setError(error.response ? error.response.data : 'Erro ao deletar task');
    }
  };

  const toggleComplete = async (id) => {
    setError('');
    const taskToToggle = todos.find((todo) => todo.id === id);
    const updatedTask = {
      ...taskToToggle,
      completed: !taskToToggle.completed
    };
    try {
      await editarTask(id, updatedTask);
      const data = await listarTasks();
      // Ordenar as tarefas por ID
      const sortedData = data.sort((a, b) => a.id - b.id);
      setTodos(sortedData);
    } catch (error) {
      console.error('Erro ao editar task', error);
      setError(error.response ? error.response.data : 'Erro ao editar task');
    }
  };

  const editTodo = async (id, description, complete, priority) => {
    setError('');
    const updatedTask = {
      descricao: description,
      completa: complete,
      priority
    };

    try {
      await editarTask(id, updatedTask);
      const data = await listarTasks();
      // Ordenar as tarefas por ID
      const sortedData = data.sort((a, b) => a.id - b.id);
      setTodos(sortedData);
    } catch (error) {
      console.error('Erro ao editar task', error);
      setError(error.response ? error.response.data : 'Erro ao editar task');
    }
  };

  const searchTaskById = async () => {
    setError('');
    if (!searchId) return; // Não execute nada se o ID não for informado

    try {
      const data = await recuperarTaskPorId(searchId);
      setFoundTask(data);
      setError(''); // Limpar o erro ao encontrar a tarefa
    } catch (error) {
      console.error('Erro ao buscar task por ID', error);
      setError(error.response ? error.response.data : 'Erro ao buscar task por ID');
      setFoundTask(null); // Limpar a tarefa encontrada ao encontrar um erro
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="TodoWrapper">
      <h1>Lista de Tarefas</h1>

      <div className="search-form">
        <input
          type="number"
          placeholder="Buscar tarefa por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="todo-input"
        />
        <button className="todo-btn" onClick={searchTaskById} disabled={!searchId}>Buscar</button>
      </div>

      {error && (
        <div className="error">
          {typeof error === 'string' ? error : JSON.stringify(error)}
          <button className="clear-error-btn" onClick={clearError}>Limpar</button>
        </div>
      )} {/* Exibir a mensagem de erro */}

      {foundTask && (
        <div className="Todo">
          <p className={`${foundTask.completo === 'Sim' ? 'completed' : 'incompleted'}`}>
            Descrição: {foundTask.descricao}
          </p>
          <div className="todo-details">
            ID: {searchId} <br />
            Prazo: {foundTask.tipos === 'data' ? foundTask.statusEntregaTarefa : 'Sem prazo'} <br />
            Prioridade: {foundTask.prioridade} <br />
          </div>
        </div>
      )}

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (
        <TodoList key={todo.id} task={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} editTodo={editTodo} />
      ))}
    </div>
  );
};

export default TodoWrapper;
  