package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Pet;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    //get all pets from a user
    @GetMapping("users/{userId}/pets")
    public List<Pet> getPetsByUser(@PathVariable(value = "userId") Long userId){
        return petRepository.findByUserId(userId);
    }

    //finds pet from user and pet id
    @GetMapping("users/{userId}/pets/{petId}")
    public Pet getPetByUser(@PathVariable(value ="userId") Long userId, @PathVariable(value = "petId") Long petId){
        return petRepository.findByIdAndUserId(petId, userId);
    }

    //add pet
    @PostMapping("users/{userId}/addPet")
    public Pet createPet(@PathVariable(value = "userId") Long userId, @RequestBody Pet pet){
        return userRepository.findById(userId).map(user -> {
            pet.setUser(user);
            return petRepository.save(pet);
        }).orElseThrow();
    }

    //update pet
    @PutMapping("/users/{userId}/pets/update")
    public Pet updatePet(@PathVariable(value="userId") Long userId, @RequestBody Pet pet){
        Pet existingPet = petRepository.findById(pet.getId()).orElse(null);
        existingPet.setPetName(pet.getPetName());
        existingPet.setPetType(pet.getPetType());
        existingPet.setBreed(pet.getBreed());
        existingPet.setSex(pet.getSex());
        existingPet.setAge(pet.getAge());
        return petRepository.save(existingPet);
    }

    //delete pet
    @DeleteMapping("/users/{userId}/pets/{petId}")
    public String deletePet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        petRepository.deleteById(petId);
        return "pet removed! " + petId;
    }

}
