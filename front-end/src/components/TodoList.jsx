import React, { useState } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

export const TodoList = ({ task, deleteTodo, toggleComplete, editTodo }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'baixa');
  const [editComplete, setEditComplete] = useState(task.completed);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setModalAction('save');
    setModalIsOpen(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'baixa');
    setEditComplete(task.completed);
  };

  const handleDelete = () => {
    setModalAction('delete');
    setModalIsOpen(true);
  };

  const confirmAction = () => {
    if (modalAction === 'save') {
      editTodo(task.id, editDescription, editComplete, editPriority);
      setIsEditing(false);
    } else if (modalAction === 'delete') {
      deleteTodo(task.id);
    }
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className='Todo'>
      {isEditing ? (
        <div className="edit-form">
          <div className="edit-options">
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="todo-input"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="todo-select"
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            <label className="todo-checkbox-label">
              <input
                type="checkbox"
                checked={editComplete}
                onChange={(e) => setEditComplete(e.target.checked)}
                className="todo-checkbox"
              />
              Completa?
            </label>
          </div>
          <div className="edit-buttons">
            <button className="todo-btn" onClick={handleSave}>Salvar</button>
            <button className="todo-btn" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="todo-content">
            <p className={`${task.completed ? 'completed' : 'incompleted'}`} >
              Descrição: {task.description}
            </p>
            <div className='divIcon'>
              <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={handleEdit} />
              <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={handleDelete} />
            </div>
          </div>
          {showDetails && (
            <div className="todo-details">
              ID: {task.id} <br />
              Prazo: {task.deadlineDate ? formatDate(task.deadlineDate) : 'Sem prazo'} <br />
              Prioridade: {task.priority} <br />
            </div>
          )}
          <button className="toggle-details-btn" onClick={toggleDetails}>
            {showDetails ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmação"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirmação</h2>
        <p>Tem certeza que deseja {modalAction === 'save' ? 'salvar as alterações' : 'excluir esta tarefa'}?</p>
        <div className="modal-buttons">
          <button className="todo-btn" onClick={confirmAction}>Sim</button>
          <button className="todo-btn" onClick={closeModal}>Não</button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
