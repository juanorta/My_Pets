package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Pet;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @GetMapping("users/{userId}/pets")
    public List<Pet> getPetsByUser(@PathVariable(value = "userId") Long userId){
        return petRepository.findByUserId(userId);
    }

    @PostMapping("users/{userId}/addPet")
    public Pet createPet(@PathVariable(value = "userId") Long userId, @RequestBody Pet pet){
        return userRepository.findById(userId).map(user -> {
            pet.setUser(user);
            return petRepository.save(pet);
        }).orElseThrow();
    }


}
