package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUserId(Long userId);
    Pet findByIdAndUserId(Long id, Long userId);
}
