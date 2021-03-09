package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.FoodImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodImageRepository extends JpaRepository<FoodImage, String> {
    FoodImage findByUserId(Long userId);
    FoodImage findByFoodId(Long foodId);
}
