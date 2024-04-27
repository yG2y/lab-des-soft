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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

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
	private LocalDate dataInicio;
	private LocalDate dataPrazo;
	private String statusEntregaTarefa;

	public Tasks(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", description=" +
				description + ", completed=" + completed + "]";
	}

	public Tasks definirPrazo(String prazo) {
		if (this.getTypes() == TasksTypes.data) {
			DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			this.dataPrazo = LocalDate.parse(prazo, formato);
			this.setDataPrazo(this.dataPrazo);
			return this;
		}
		if (this.getTypes() == TasksTypes.prazo) {
			this.dataPrazo = this.dataInicio.plusDays(Long.parseLong(prazo));
			this.setDataPrazo(this.dataPrazo);
			return this;
		}
		return null;
	}

//	public Tasks statusDeEntrega() {
//		LocalDate dataAtual = LocalDate.now();
//		if (this.)
//		return null;
//	}
}