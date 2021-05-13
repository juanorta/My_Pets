package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Medication;
import com.juan.projects.mypets.repository.MedicationRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MedicationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    //get all meds by pet
    @GetMapping("/users/{userId}/pets/{petId}/medications")
    public List<Medication> getMedsByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return medicationRepository.findByPetId(petId);
    }

    //get all meds by user
    @GetMapping("users/{userId}/medications")
    public List<Medication> getMedsByUser(@PathVariable(value = "userId") Long userId){
        return medicationRepository.findByUserId(userId);
    }

    //add medication
    @PostMapping("/users/{userId}/pets/{petId}/addMedication")
    public Medication createMedication(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                       @RequestBody Medication medication){
        return userRepository.findById(userId).map(user -> {
           medication.setUser(user);
           return petRepository.findById(petId).map(pet -> {
               medication.setPet(pet);
               return medicationRepository.save(medication);
           }).orElseThrow();
        }).orElseThrow();
    }

    //edit medication
    @PutMapping("users/{userId}/pets/{petId}/medications/{medId}/update")
    public Medication updateMed(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                @PathVariable(value = "medId") Long medId, @RequestBody Medication medication){
        Medication existingMedication = medicationRepository.findById(medication.getId()).orElse(null);

        existingMedication.setMedicationName(medication.getMedicationName());
        existingMedication.setStartDate(medication.getStartDate());
        existingMedication.setEndDate(medication.getEndDate());
        existingMedication.setDosageInstructions(medication.getDosageInstructions());
        existingMedication.setPetName(medication.getPetName());
        existingMedication.setPetMedId(medication.getPetMedId());
        existingMedication.setData(medication.getData());

        return medicationRepository.save(existingMedication);
    }

    //delete medication
    @DeleteMapping("users/{userId}/pets/{petId}/meds/{medId}")
    public String deleteMed(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                            @PathVariable(value = "medId") Long medId){
        medicationRepository.deleteById(medId);
        return "medication removed!! " + medId;
    }
}
