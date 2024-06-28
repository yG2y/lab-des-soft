package com.labdessoft.projeto01.service;

import com.labdessoft.projeto01.Enum.TasksPriority;
import com.labdessoft.projeto01.Enum.TasksTypes;
import com.labdessoft.projeto01.VO.TaskVO;
import com.labdessoft.projeto01.entity.Tasks;
import com.labdessoft.projeto01.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

	public void adcionarTarefas(String descricao, Boolean completa, String tipos, TasksPriority prioridade) throws Exception{
		Tasks tasks = new Tasks();
		validaDadosTipos(tipos);
		validaString(descricao);
		tasks.setTypes(validaTipos(tipos));
		tasks.definirPrazo(tipos);
		tasks.setCompleted(completa);
		tasks.setDescription(descricao);
		tasks.setPriority(prioridade);

		taskRepository.save(tasks);
	}

	private  void validaString(String descricao) throws Exception {
		if(descricao.length() < 10){
			throw new Exception("Quantidade de caracteres inválidas");
		}
	}

	private void validaDadosTipos(String tipos) throws Exception{
		if (tipos != null) {
			if (tipos.length() > 10){
				throw new Exception("Prazo excedeu limite de caracteres");
			}
			if (tipos.length() < 4) {
				if (Integer.valueOf(tipos) < 1) {
					throw new Exception("Prazo nulo ou negativo");
				}
			}
		}
	}

	private TasksTypes validaTipos(String tipos) throws Exception{
		if (tipos == null) {
			return TasksTypes.livre;
		} else if (tipos.length() > 3 && tipos.length() < 11) {
			if (tipos.length() > 3 && tipos.length() < 10) {
				throw new Exception("Data precisa ser informada no formato DD/MM/AAAA ou em até 3 digitos para prazo!");
			}
			LocalDate data = converteStringParaData(tipos);
			LocalDate dataAtual = LocalDate.now();
			if (data.isAfter(dataAtual) || data.equals(dataAtual)) {
				return TasksTypes.data;
			}
			throw new Exception("Data inferior a Atual!");
		} if (tipos.length() > 0 && tipos.length() < 4) {
			return TasksTypes.prazo;
		} else {
			throw new Exception("Prazo Negativo ou data inválida");
		}
	}

	private LocalDate converteStringParaData(String tipos) throws ParseException {
		DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate data = LocalDate.parse(tipos,formato);
		return data;
	}

	public void editarTarefas(Long id, String descricao, Boolean completa, TasksPriority prioridade) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encontrada");
		}
		validaString(descricao);
		tasks.get().setCompleted(completa ==  null ? tasks.get().getCompleted() : completa);
		tasks.get().setDescription(descricao ==  null ? tasks.get().getDescription() : descricao );
		tasks.get().setPriority(prioridade ==  null ? tasks.get().getPriority() : prioridade );

		taskRepository.save(tasks.get());
	}

	public Object recuperarTarefas(Long id) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encotrada");
		}

		tasks.get().statusDeEntrega();
		return TaskVO.passsarDadosParaVO(tasks.get(),true);
	}

	public void deletar(Long id) throws Exception {
		Optional<Tasks> tasks = taskRepository.findById(id);
		if(!tasks.isPresent()) {
			throw new Exception("Task não encotrada");
		}
		taskRepository.delete(tasks.get());
	}
}
