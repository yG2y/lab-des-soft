package com.labdessoft.projeto01.entity;

import com.labdessoft.projeto01.Enum.TasksPriority;
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
import java.time.temporal.ChronoUnit;
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
	private LocalDate initialDate;
	private LocalDate deadlineDate;
	private String deliveryStatus;
	private TasksTypes types;
	private TasksPriority priority;

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
			this.deadlineDate = LocalDate.parse(prazo, formato);
			this.setDeadlineDate(this.deadlineDate);
			return this;
		}
		if (this.getTypes() == TasksTypes.prazo) {
			this.deadlineDate = this.initialDate.plusDays(Long.parseLong(prazo));
			this.setDeadlineDate(this.deadlineDate);
			return this;
		}
		return null;
	}

	public Tasks statusDeEntrega() {
		LocalDate dataAtual = LocalDate.now();
		if (this.types == TasksTypes.livre) {
			if (this.completed == true) {
				this.setDeliveryStatus("A tarefa foi concluída!");
				return this;
			}
			return null;

		} else if (this.types != TasksTypes.livre) {
			long diferencaEmDias = ChronoUnit.DAYS.between(dataAtual, this.deadlineDate);
			if (this.deadlineDate.isBefore(dataAtual)) {
				if (this.completed == false) {
					this.setDeliveryStatus("A tarefa está atrasada à " + Math.abs(diferencaEmDias) + " dias!");
					return this;
				}
				if (this.deadlineDate.isBefore(dataAtual) && this.completed == true) {
					this.setDeliveryStatus("A tarefa foi concluída!");
					return this;
				}
			} if (this.deadlineDate.isAfter(dataAtual)) {
				this.setDeliveryStatus("A entrega está prevista para daqui " + Math.abs(diferencaEmDias) + " dias!");
				return this;
			}
		}

        return null;
	}
}
