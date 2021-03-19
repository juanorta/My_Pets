package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Preventative;
import com.juan.projects.mypets.repository.FoodRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.PreventativeRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PreventativeController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PreventativeRepository preventativeRepository;

    @Autowired
    private FoodRepository foodRepository;

    //get all preventatives for a pet
    @GetMapping("/users/{userId}/pets/{petId}/preventatives")
    public List<Preventative> getPrevByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return preventativeRepository.findByPetId(petId);
    }

    //get all preventatives for a user
    @GetMapping("/users/{userId}/preventatives")
    public List<Preventative> getPrevByUser(@PathVariable(value = "userId") Long userId){
        return preventativeRepository.findByUserId(userId);
    }

    //add preventative
    @PostMapping("/users/{userId}/pets/{petId}/addPreventative")
    public Preventative createPreventative(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                           @RequestBody Preventative preventative){
        return userRepository.findById(userId).map(user -> {
            preventative.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                preventative.setPet(pet);
                return preventativeRepository.save(preventative);
            }).orElseThrow();
        }).orElseThrow();
    }

    //edit preventative
    @PutMapping("/users/{userId}/pets/{petId}/preventatives/{prevId}/update")
    public Preventative getPrev(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "prevId") Long prevId, @RequestBody Preventative preventative){
        Preventative existingPreventative = preventativeRepository.findById(preventative.getId()).orElse(null);
        existingPreventative.setName(preventative.getName());
        existingPreventative.setType(preventative.getType());
        existingPreventative.setLastGiven(preventative.getLastGiven());
        existingPreventative.setDueNext(preventative.getDueNext());
        existingPreventative.setNotes(preventative.getNotes());
        existingPreventative.setPetName(preventative.getPetName());
        existingPreventative.setPetPreventativeId(preventative.getPetPreventativeId());
        existingPreventative.setData(preventative.getData());

        return preventativeRepository.save(existingPreventative);
    }

    //delete preventative
    @DeleteMapping("/users/{userId}/pets/{petId}/preventatives/{prevId}")
    public String deletePreventative(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "prevId") Long prevId){
        preventativeRepository.deleteById(prevId);
        return "preventative removed!! " + prevId;
    }

}
