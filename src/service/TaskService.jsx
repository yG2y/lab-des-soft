import api from '../api';

export const listarTasks = async () => {
  try {
    const response = await api.get('/listar-tasks');
    console.log('Tasks:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar tasks', error);
    throw error;
  }
};

export const adicionarTask = async (task) => {
  try {
    const response = await api.post('/adicionar-task', task);
    console.log('Tarefa adicionada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar task', error);
    throw error;
  }
};

export const editarTask = async (id, task) => {
  try {
    const response = await api.put(`/editar-task?id=${id}`, task);
    console.log('Tarefa editada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar task', error);
    throw error;
  }
};

export const recuperarTaskPorId = async (id) => {
  try {
    const response = await api.get(`/recuperar-task-por-id?id=${id}`);
    console.log('Tarefa recuperada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao recuperar task', error);
    throw error;
  }
};

export const deletarTaskPorId = async (id) => {
  try {
    const response = await api.delete(`/deletar-task-por-id?id=${id}`);
    console.log('Tarefa deletada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar task', error);
    throw error;
  }
};
