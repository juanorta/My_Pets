package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Food;
import com.juan.projects.mypets.model.PetImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetImageRepository extends JpaRepository<PetImage, String>{
    PetImage findByUserId(Long userId);
    PetImage findByPetId(Long petId);
}
