package com.labdessoft.projeto01.service;

import com.labdessoft.projeto01.entity.Tasks;
import com.labdessoft.projeto01.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

	@Autowired
    TaskRepository taskRepository;

    public List<Tasks> listarTarefas() throws Exception {
            List<Tasks> listaTaks = new ArrayList<>();
            
            taskRepository.findAll().forEach(listaTaks::add);
			if (listaTaks.isEmpty()){
               throw new Exception("Não existe tasks cadastradas");
            }
            return listaTaks;
       }

	public void adcionarTarefas(String descricao, Boolean completa) {
		Tasks tasks = new Tasks();
		tasks.setCompleted(completa);
		tasks.setDescription(descricao);
		taskRepository.save(tasks);

	}

	public void editarTarefas(Long id, String descricao, Boolean completa) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encotrada");
		}
		tasks.get().setCompleted(completa ==  null ? tasks.get().getCompleted() : completa);
		tasks.get().setDescription(descricao ==  null ? tasks.get().getDescription() : descricao );
		taskRepository.save(tasks.get());
	}

	public Object recuperarTarefas(Long id) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encotrada");
		}
		return tasks.get();
	}

	public void deletar(Long id) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encotrada");
		}
		taskRepository.delete(tasks.get());
	}
}
