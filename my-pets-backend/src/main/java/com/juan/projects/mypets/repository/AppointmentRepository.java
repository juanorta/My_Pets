package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Appointment;
import com.juan.projects.mypets.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserId(Long userId);
    List<Appointment> findByPetId(Long petId);
    Pet findByIdAndPetId(Long id, Long petId);
}
