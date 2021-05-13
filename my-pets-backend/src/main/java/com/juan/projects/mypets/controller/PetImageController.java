package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.PetImage;
import com.juan.projects.mypets.payload.ImageResponse;
import com.juan.projects.mypets.repository.PetImageRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import com.juan.projects.mypets.service.PetImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PetImageController {

    @Autowired
    private PetImageService petImageService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PetImageRepository petImageRepository;

    @Autowired
    private PetImage petImage;

    @GetMapping("/users/{userId}/pets/{petId}/petImage/{imageId}")
    public Optional<PetImage> getPetImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId,
                                          @PathVariable(value = "imageId") String imageId){
        return petImageRepository.findById(imageId);
    }

    @PostMapping("/users/{userId}/pets/{petId}/uploadImage")
    public ImageResponse uploadImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @RequestParam("file")MultipartFile file) {
        PetImage fileName = petImageService.storeFile(file, userId, petId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new ImageResponse(fileName.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());
    }

    @DeleteMapping("/users/{userId}/pets/{petId}/petImages/{imageId}")
    public String deletePetImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId")
                                 Long petId, @PathVariable(value = "imageId") String imageId
                                 ){
        petImageRepository.deleteById(imageId);
        return "image removed!! " + imageId;
    }

    @PutMapping("/users/{userId}/pets/{petId}/petImages/{imageId}/update")
    public ImageResponse editImage(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "imageId")
                                   String imageId, @RequestParam("file") MultipartFile file){
        petImageRepository.deleteById(imageId);

        PetImage fileName = petImageService.storeFile(file, userId, petId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new ImageResponse(fileName.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());

    }

}
