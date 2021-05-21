package com.juan.projects.mypets.controller;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.juan.projects.mypets.model.Pet;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Filter;

@RestController
@RequestMapping("/api")
public class PetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    //get all pets from a user
    @GetMapping("users/{userId}/pets")
    MappingJacksonValue getPetsByUser(@PathVariable(value = "userId") Long userId){
        SimpleBeanPropertyFilter simpleBeanPropertyFilter = SimpleBeanPropertyFilter.serializeAllExcept("appointments", "weights",
                "medications", "preventatives", "food", "vets");

        FilterProvider filterProvider = new SimpleFilterProvider()
                .addFilter("petFilter", simpleBeanPropertyFilter);

        List<Pet> pets = petRepository.findByUserId(userId);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(pets);
        mappingJacksonValue.setFilters(filterProvider);

        return mappingJacksonValue;
    }

    //get all pets with weights from a user
    @GetMapping("users/{userId}/pets/withWeights")
    MappingJacksonValue getPetsByUserFood(@PathVariable(value = "userId") Long userId){
        SimpleBeanPropertyFilter simpleBeanPropertyFilter = SimpleBeanPropertyFilter.serializeAllExcept("appointments","medications",
                "preventatives", "food", "vets", "petImage");

        FilterProvider filterProvider = new SimpleFilterProvider()
                .addFilter("petFilter", simpleBeanPropertyFilter);

        List<Pet> pets = petRepository.findByUserId(userId);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(pets);
        mappingJacksonValue.setFilters(filterProvider);

        return  mappingJacksonValue;
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

