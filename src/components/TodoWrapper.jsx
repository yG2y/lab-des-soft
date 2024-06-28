import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { listarTasks, adicionarTask, editarTask, deletarTaskPorId } from '../service/TaskService';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await listarTasks();
        setTodos(data);
      } catch (error) {
        console.error('Erro ao buscar tasks', error);
      }
    };

    fetchTasks();
  }, []);

  const addTodo = async (description) => {
    const newTask = {
      descricao: description,
      completa: false,
      prazo: '2024-12-31',
      priority: 'LOW'
    };
    try {
      await adicionarTask(newTask);
      const data = await listarTasks();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao adicionar task', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deletarTaskPorId(id);
      const data = await listarTasks();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao deletar task', error);
    }
  };

  const toggleComplete = async (id) => {
    const taskToToggle = todos.find((todo) => todo.id === id);
    const updatedTask = {
      ...taskToToggle,
      completed: !taskToToggle.completed
    };
    try {
      await editarTask(id, updatedTask);
      const data = await listarTasks();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao editar task', error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Lista de Tarefas</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoList key={todo.id} task={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default TodoWrapper;
