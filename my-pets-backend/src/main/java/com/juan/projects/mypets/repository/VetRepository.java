package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VetRepository extends JpaRepository<Vet, Long> {
    List<Vet> findByUserId(Long userId);
    List<Vet> findByPetId(Long userId);
    Vet findByIdAndPetId(Long id, Long petId);
}
