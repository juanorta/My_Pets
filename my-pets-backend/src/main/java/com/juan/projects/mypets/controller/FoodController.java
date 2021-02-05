package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Appointment;
import com.juan.projects.mypets.model.Food;
import com.juan.projects.mypets.repository.FoodRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FoodController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/users/{userId}/pets/{petId}/food")
    public List<Food> getFoodByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return foodRepository.findByPetId(petId);
    }

    @GetMapping("/users/{userId}/food")
    public List<Food> getFoodByUser(@PathVariable(value = "userId") Long userId){
        return foodRepository.findByUserId(userId);
    }

    @PostMapping("/users/{userId}/pets/{petId}/addFood")
    public Food createFood(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @RequestBody Food food){
        return userRepository.findById(userId).map(user -> {
            food.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                food.setPet(pet);

                return foodRepository.save(food);
            }).orElseThrow();
        }).orElseThrow();
    }

    @DeleteMapping("/users/{userId}/pets/{petId}/food/{foodId}")
    public String deleteFood(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "foodId") Long foodId){
        foodRepository.deleteById(foodId);
        return "food removed! " + foodId;
    }

    @PutMapping("/users/{userId}/pets/{petId}/food/{foodId}/update")
    public Food updateFood(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "foodId") Long foodId, @RequestBody Food food){
        Food existingFood = foodRepository.findById(food.getId()).orElse(null);
        existingFood.setFoodName(food.getFoodName());
        existingFood.setWhereToBuy(food.getWhereToBuy());
        existingFood.setType(food.getType());
        existingFood.setWetOrDry(food.getWetOrDry());
        existingFood.setFlavor(food.getFlavor());
        existingFood.setNotes(food.getNotes());
        return foodRepository.save(existingFood);
    }
}
