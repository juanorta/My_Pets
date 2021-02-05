package com.juan.projects.mypets.repository;


import com.juan.projects.mypets.model.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
    List<Weight> findByUserId(Long userId);
    List<Weight> findByPetId(Long petId);
    Weight findByIdAndPetId(Long id, Long petId);
}
