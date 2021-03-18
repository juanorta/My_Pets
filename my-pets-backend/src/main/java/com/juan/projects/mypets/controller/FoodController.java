package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Appointment;
import com.juan.projects.mypets.model.Food;
import com.juan.projects.mypets.repository.FoodRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.PreventativeRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FoodController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private PreventativeRepository preventativeRepository;

    //get all food for a pet
    @GetMapping("/users/{userId}/pets/{petId}/food")
    public List<Food> getFoodByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
//        System.out.println(foodRepository.findById((long) 80).orElse(null));
//
//        List<Food> foodOptional= foodRepository.findByPetId(petId);
//        System.out.println(foodOptional);
        return foodRepository.findByPetId(petId);
    }

    //get all food for a user
    @GetMapping("/users/{userId}/food")
    public List<Food> getFoodByUser(@PathVariable(value = "userId") Long userId){
        return foodRepository.findByUserId(userId);
    }

    //add food
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

    //delete food
    @DeleteMapping("/users/{userId}/pets/{petId}/food/{foodId}")
    public String deleteFood(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "foodId") Long foodId){
        foodRepository.deleteById(foodId);
        return "food removed! " + foodId;
    }

    //update food
    @PutMapping("/users/{userId}/pets/{petId}/food/{foodId}/update")
    public Food updateFood(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "foodId") Long foodId, @RequestBody Food food){
        Food existingFood = foodRepository.findById(food.getId()).orElse(null);
        existingFood.setFoodName(food.getFoodName());
        existingFood.setWhereToBuy(food.getWhereToBuy());
        existingFood.setType(food.getType());
        existingFood.setWetOrDry(food.getWetOrDry());
        existingFood.setFlavor(food.getFlavor());
        existingFood.setNotes(food.getNotes());
        existingFood.setPetName(food.getPetName());
        existingFood.setPetFoodId(food.getPetFoodId());
        existingFood.setData(food.getData());
        return foodRepository.save(existingFood);
    }
}
