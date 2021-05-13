package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Weight;
import com.juan.projects.mypets.repository.AppointmentRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import com.juan.projects.mypets.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WeightController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private WeightRepository weightRepository;

    //get all weights by pet
    @GetMapping("/users/{userId}/pets/{petId}/weights")
    public List<Weight> getWeightsByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return weightRepository.findByPetId(petId);
    }

    //get all weights by user
    @GetMapping("/users/{userId}/weights")
    public List<Weight> getWeightsByUser(@PathVariable(value = "userId") Long userId){
        return weightRepository.findByUserId(userId);
    }

    //add new weight
    @PostMapping("/users/{userId}/pets/{petId}/addWeight")
    public Weight createWeight(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @RequestBody Weight weight){
        return userRepository.findById(userId).map(user -> {
            weight.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                weight.setPet(pet);

                return weightRepository.save(weight);
            }).orElseThrow();
        }).orElseThrow();
    }

    //delete weight
    @DeleteMapping("/users/{userId}/pets/{petId}/weights/{weightId}")
    public String deleteWeight(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "weightId") Long weightId){
        weightRepository.deleteById(weightId);
        return "weight removed! " + weightId;
    }

    //edit weight
    @PutMapping("/users/{userId}/pets/{petId}/weights/{weightId}/update")
    public Weight updateWeight(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "weightId") Long weightId, @RequestBody Weight weight){
        Weight existingWeight = weightRepository.findById(weight.getId()).orElse(null);
        existingWeight.setWeightValue(weight.getWeightValue());

        existingWeight.setUnit(weight.getUnit());
        existingWeight.setDateWeighed(weight.getDateWeighed());

        existingWeight.setNotes(weight.getNotes());

        //new
        existingWeight.setPetName(weight.getPetName());
        existingWeight.setPetWeightId(weight.getPetWeightId());


        return weightRepository.save(existingWeight);
    }
}
