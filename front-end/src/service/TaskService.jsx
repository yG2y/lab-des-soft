import { api } from '../api';

export const listarTasks = async () => {
  const response = await api.get('/listar-task');
  return response.data;
};

export const adicionarTask = async (task) => {
  const response = await api.post('/adicionar-task', null, {
    params: task,
  });
  return response.data;
};

export const editarTask = async (id, task) => {
  const response = await api.put(`/editar-task`, null, {
    params: { id, ...task },
  });
  return response.data;
};

export const deletarTaskPorId = async (id) => {
  const response = await api.delete(`/deletar-task-por-id`, {
    params: { id },
  });
  return response.data;
};

export const recuperarTaskPorId = async (id) => {
  const response = await api.get(`/recuperar-task-por-id`, {
    params: { id },
  });
  return response.data;
};
