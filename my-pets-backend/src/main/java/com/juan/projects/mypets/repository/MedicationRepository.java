package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    List<Medication> findByUserId(Long userId);
    List<Medication> findByPetId(Long petId);
    Medication findByIdAndPetId(Long id, Long petId);
}
