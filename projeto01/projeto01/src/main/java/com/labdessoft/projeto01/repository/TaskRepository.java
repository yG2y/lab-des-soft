package com.labdessoft.projeto01.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.labdessoft.projeto01.entity.Tasks;

public interface TaskRepository extends JpaRepository<Tasks, Long> {
}
