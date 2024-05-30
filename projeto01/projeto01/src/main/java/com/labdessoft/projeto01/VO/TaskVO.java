package com.labdessoft.projeto01.VO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.labdessoft.projeto01.Enum.TasksTypes;
import com.labdessoft.projeto01.entity.Tasks;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskVO {
    private String descricao;
    private String completo;
    private TasksTypes tipos;
    private LocalDate dataInicio;
    private LocalDate dataPrazo;
    private String statusEntregaTarefa;
    private String prioridade;

    public static Object passsarDadosParaVO(Tasks tasks, Boolean mostrarStatus) {
        TaskVO taskVO = new TaskVO();
        taskVO.setDescricao(tasks.getDescription());
        taskVO.setCompleto(tasks.getCompleted() == true ? "Sim" : "Não");
        taskVO.setTipos(tasks.getTypes());
        taskVO.setPrioridade(tasks.getPriority().toString());
//        taskVO.setDataInicio(tasks.getInitialDate());
//        taskVO.setDataPrazo(tasks.getDeadlineDate());

        if(mostrarStatus){
            taskVO.setStatusEntregaTarefa(tasks.getDeliveryStatus());
        }
        return taskVO;
    }
}
