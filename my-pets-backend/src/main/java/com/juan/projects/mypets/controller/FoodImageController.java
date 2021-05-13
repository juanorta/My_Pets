package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Food;
import com.juan.projects.mypets.model.FoodImage;
import com.juan.projects.mypets.model.PetImage;
import com.juan.projects.mypets.payload.ImageResponse;
import com.juan.projects.mypets.repository.FoodImageRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import com.juan.projects.mypets.service.FoodImageService;
import com.juan.projects.mypets.service.PetImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.Lob;
import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FoodImageController {

    @Autowired
    private FoodImageService foodImageService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private FoodImageRepository foodImageRepository;

    @Autowired
    private FoodImage foodImage;

    @GetMapping("/users/{userId}/pets/{petId}/food/{foodId}/foodImage/{imageId}")
    public Optional<FoodImage> getFoodImage(@PathVariable(value = "userId") Long userId,
                                            @PathVariable(value = "petId") Long petId,
                                            @PathVariable(value = "foodId") Long foodId,
                                            @PathVariable(value = "imageId") String imageId){
        return foodImageRepository.findById(imageId);
    }


    @PostMapping("/users/{userId}/pets/{petId}/food/{foodId}/uploadImage")
    public ImageResponse uploadImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                     @PathVariable(value = "foodId") Long foodId, @RequestParam("file")MultipartFile file){
       FoodImage fileName = foodImageService.storeFile(file, userId, petId, foodId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new ImageResponse(fileName.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());
    }

    @DeleteMapping("/users/{userId}/pets/{petId}/food/{foodId}/foodImage/{imageId}")
    public String deleteFoodImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                  @PathVariable(value = "foodId") Long foodId, @PathVariable(value = "imageId") String imageId){
        foodImageRepository.deleteById(imageId);
        return "food image removed!! " + imageId;
    }

    @PutMapping("/users/{userId}/pets/{petId}/food/{foodId}/foodImage/{imageId}/update")
    public ImageResponse editFoodImage(@PathVariable(value = "userId") Long userId,
                                       @PathVariable(value = "petId") Long petId,
                                       @PathVariable(value = "foodId") Long foodId,
                                       @PathVariable(value = "imageId") String imageId,
                                       @RequestParam("file")MultipartFile file){
        foodImageRepository.deleteById(imageId);

        FoodImage fileName = foodImageService.storeFile(file, userId, petId, foodId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new ImageResponse(fileName.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());

    }
//
//    @PutMapping("/users/{")
}
