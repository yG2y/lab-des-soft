package com.labdessoft.projeto01.entity;

import com.labdessoft.projeto01.Enum.TasksTypes;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Todos os detalhes sobre uma tarefa. ")
public class Tasks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Schema(name = "Descrição da tarefa deve possuir pelo menos 10 caracteres")
	@Size(min = 10, message = "Descrição da tarefa deve possuir pelo menos 10 caracteres")
	private String description;
	private Boolean completed;
	private TasksTypes types;

	public Tasks(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", description=" +
				description + ", completed=" + completed + "]";
	}


}