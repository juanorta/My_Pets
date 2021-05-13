package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Vet;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import com.juan.projects.mypets.repository.VetRepository;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private VetRepository vetRepository;

    //get all vets for a pet
    @GetMapping("/users/{userId}/pets/{petId}/vets")
    public List<Vet> getVetsByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return vetRepository.findByPetId(petId);
    }

    //get all vets for a user
    @GetMapping("users/{userId}/vets")
    public List<Vet> getVetsByUser(@PathVariable(value = "userId") Long userId){
        return vetRepository.findByUserId(userId);
    }

    //add a vet
    @PostMapping("/users/{userId}/pets/{petId}/addVet")
    public Vet createVet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @RequestBody Vet vet){
        return userRepository.findById(userId).map(user -> {
            vet.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                vet.setPet(pet);
                return vetRepository.save(vet);
            }).orElseThrow();
        }).orElseThrow();
    }

    //edit vet
    @PutMapping("/users/{userId}/pets/{petId}/vets/{vetId}/update")
    public Vet updateVet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "vetId") Long vetId,
                         @RequestBody Vet vet){
        return userRepository.findById(userId).map(user -> {
            vet.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                vet.setPet(pet);
                return vetRepository.save(vet);
            }).orElseThrow();
        }).orElseThrow();

    }

    //delete vet
    @DeleteMapping("users/{userId}/pets/{petId}/vets/{vetId}")
    public String deleteVet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                            @PathVariable(value = "vetId") Long vetId){
         vetRepository.deleteById(vetId);
         return "vet deleted!! " + vetId;
    }
}

