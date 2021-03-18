package com.juan.projects.mypets.repository;

import com.juan.projects.mypets.model.Preventative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreventativeRepository extends JpaRepository<Preventative, Long> {
    List<Preventative> findByUserId(Long userId);
    List<Preventative> findByPetId(Long petId);
    Preventative findByIdAndPetId(Long id, Long petId);
}
