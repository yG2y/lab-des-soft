import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && priority) {
      const newTodo = {
        description,
        completed,
        priority,
        dueDate
      };
      console.log("Submitting new todo:", newTodo);
      addTodo(newTodo);
      setDescription('');
      setCompleted(false);
      setPriority('LOW');
      setDueDate('');
    }
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
        Adicionar Tarefa
      </button>
    </form>
  );
};
export default TodoForm;
