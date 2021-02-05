package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByUserId(Long userId);
    List<Food> findByPetId(Long petId);
    Food findByIdAndPetId(Long id, Long petId);
}
