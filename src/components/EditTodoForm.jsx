import React, { useState, useEffect } from "react";

export const EditTodoForm = ({ todo, updateTodo }) => {
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.deadlineDate);

  useEffect(() => {
    setDescription(todo.description);
    setCompleted(todo.completed);
    setPriority(todo.priority);
    setDueDate(todo.deadlineDate);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      description,
      completed,
      priority,
      dueDate
    };
    console.log("Submitting updated todo:", updatedTodo);
    updateTodo(updatedTodo);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
        placeholder="Descrição da Tarefa"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="todo-select"
      >
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </select>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
        className="todo-checkbox"
      />
      <input
        type="text"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="todo-input"
        placeholder="Prazo (opcional)"
      />
      <button type="submit" className="todo-btn">
        Atualizar Tarefa
      </button>
    </form>
  );
};

export default EditTodoForm;
