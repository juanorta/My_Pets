package com.juan.projects.mypets.service;

import com.juan.projects.mypets.exception.FileStorageException;
import com.juan.projects.mypets.model.*;
import com.juan.projects.mypets.repository.FoodImageRepository;
import com.juan.projects.mypets.repository.FoodRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;

@Component
public class FoodImageService {
    @Autowired
    private FoodImageRepository foodImageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private FoodRepository foodRepository;

    public FoodImage storeFile(MultipartFile file, Long userId, Long petId, Long foodId){
        System.out.println("file!!");
        System.out.println(StringUtils.cleanPath(file.getOriginalFilename()));
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence" + fileName);

            }
            FoodImage foodImage = new FoodImage(fileName, file.getContentType(), file.getBytes());

            Optional<User> response = userRepository.findById(userId);
            User user = response.get();
            Optional<Pet> petResponse = petRepository.findById(petId);
            Pet pet = petResponse.get();
            Optional<Food> foodResponse = foodRepository.findById(foodId);
            Food food = foodResponse.get();

            System.out.println("USER: " );
            System.out.println(user.getName());
            System.out.println(pet.getPetName());
            System.out.println(food.getFoodName());

            foodImage.setUser(user);
            foodImage.setFood(food);
            return foodImageRepository.save(foodImage);
        }
        catch (IOException ex){
            throw new FileStorageException("Could not store file " + fileName + "Please try again!", ex);
        }



    }
    public FoodImage getImage(String fileId){
        return foodImageRepository.findById(fileId)
                .orElseThrow();
    }
}
