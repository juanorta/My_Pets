package com.juan.projects.mypets.service;

import com.juan.projects.mypets.exception.FileStorageException;
import com.juan.projects.mypets.model.Pet;
import com.juan.projects.mypets.model.PetImage;
import com.juan.projects.mypets.model.User;
import com.juan.projects.mypets.repository.PetImageRepository;
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
public class PetImageService {
    @Autowired
    private PetImageRepository petImageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;



    public PetImage storeFile(MultipartFile file, Long userId, Long petId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            if(fileName.contains("..")){
               throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);

            }

            PetImage petImage = new PetImage(fileName, file.getContentType(), file.getBytes());

//            userRepository.findById(userId).map(user -> {
//            petImage.setUser(user);
//            petRepository.findById(petId).map(pet -> {
//                petImage.setPet(pet);
//
////               petImageRepository.save(petImage);
//                return pet;
//            }).orElseThrow();
//            return user;
//        }).orElseThrow();

//            petRepository.findById(petId).map(pet -> {
//                petim
//            })
            Optional<User> response = userRepository.findById(userId);
            Optional<Pet> petResponse = petRepository.findById(petId);
            User user = response.get();
            Pet pet = petResponse.get();

            System.out.println("USER ID: " + userId);
            System.out.println(response.isPresent());
            System.out.println(user.getName());

            System.out.println("PET ID: "+petId);
            System.out.println(petResponse.isPresent());
            System.out.println(pet.getPetName());


//            System.out.println(user.getName());
//            System.out.println(pet);
            petImage.setUser(user);
//            Pet pet = response.get();
            petImage.setPet(pet);
            return petImageRepository.save(petImage);
        }
        catch (IOException ex){
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public PetImage getImage(String fileId){
        return petImageRepository.findById(fileId)
                .orElseThrow();
    }
}
