import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [description, setDescription] = useState('');
  const [complete, setComplete] = useState(false);
  const [priority, setPriority] = useState('baixa');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length >= 10) {
      const finalDeadline = deadline.trim() === '' ? null : deadline;
      addTodo(description, complete, priority, finalDeadline);
      setDescription('');
      setComplete(false);
      setPriority('baixa');
      setDeadline('');
    } else {
      alert('Descrição deve ter pelo menos 10 caracteres');
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
        <option value="alta">Alta</option>
        <option value="media">Média</option>
        <option value="baixa">Baixa</option>
      </select>
      <label className="todo-checkbox-label">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => setComplete(e.target.checked)}
          className="todo-checkbox"
        />
        Completa?
      </label>
      <input
        type="text"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
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
