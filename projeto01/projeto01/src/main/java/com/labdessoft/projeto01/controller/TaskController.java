package com.labdessoft.projeto01.controller;

import com.labdessoft.projeto01.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/task")
@RestController
public class TaskController {

	@Autowired
	TaskService taskService;

	@GetMapping("/listar-task")
	@Operation(summary = "Lista todas as tarefas da lista")
	public ResponseEntity<Object> listarTodos() {
		try {
			return new ResponseEntity<>(taskService.listarTarefas(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/adicionar-task")
	@Operation(summary = "Adcionar tarefas na lista")
	public ResponseEntity<String> adicionar(String descricao, Boolean completa) {
		taskService.adcionarTarefas(descricao, completa);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping("/editar-task")
	@Operation(summary = "Editar tarefas na lista")
	public ResponseEntity<String> editar(@RequestParam() Long id, @RequestParam(required = false) String descricao,
			@RequestParam(required = false) Boolean completa) {
		try {
			taskService.editarTarefas(id, descricao, completa);
			return new ResponseEntity<>(HttpStatus.UPGRADE_REQUIRED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	@GetMapping("/recuperar-task-por-id")
	@Operation(summary = "Recuperar tarefas por id")
	public ResponseEntity<Object> recuperar(@RequestParam() Long id) {
		try {
			
			return new ResponseEntity<>(taskService.recuperarTarefas(id),HttpStatus.UPGRADE_REQUIRED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	@DeleteMapping("/deletar-task-por-id")
	@Operation(summary = "Recuperar tarefas por id")
	public ResponseEntity<Object> deletar(@RequestParam() Long id) {
		try {
			taskService.deletar(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
}
