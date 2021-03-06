package com.juan.projects.mypets.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;


    private String providerId;

    @NotNull
    @Column
    private String role;

    //relationship with pets
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Pet> pets;

    @JsonManagedReference
   @JsonIgnore
    public List<Pet> getPets() {
        return pets;
    }

    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }

    //creating relationship with PetImage
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    @NotFound(action = NotFoundAction.IGNORE)
    private List<PetImage> petImages;

    @JsonManagedReference(value = "user-petimage")
    @JsonIgnore
    public List<PetImage> getPetImages(){
        return petImages;
    }

    public void setPetImages(List<PetImage> petImages){
        this.petImages = petImages;
    }

    //creating relationships with FoodImage
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<FoodImage> foodImages;

    @JsonManagedReference(value = "user-foodImage")
    @JsonIgnore
    public List<FoodImage> getFoodImages(){ return foodImages;}

    public void setFoodImages(List<FoodImage> foodImages){
        this.foodImages = foodImages;
    }



    //relationship with appointments
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Appointment> appointments;

    @JsonManagedReference(value = "user-appt")
    @JsonIgnore
    public List<Appointment> getAppointments(){
        return appointments;
    }
    public void setAppointments(List<Appointment> appointments){
        this.appointments = appointments;
    }

    //relationship with weights
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Weight> weights;

    @JsonManagedReference(value = "user-weight")
    @JsonIgnore
    public List<Weight> getWeights(){
        return weights;
    }

    public void setWeights(List<Weight> weights){
        this.weights = weights;
    }

    //relationship with food
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Food> food;

    @JsonManagedReference(value = "user-food")
    @JsonIgnore
    public List<Food> getFood(){
        return food;
    }

    public void setFood(List<Food> food) {
        this.food = food;
    }

    //relationship with preventatives
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Preventative> preventatives;

    @JsonManagedReference(value = "user-preventative")
    @JsonIgnore
    public List<Preventative> getPreventatives(){ return preventatives;}

    public void setPreventatives(List<Preventative> preventatives){
        this.preventatives = preventatives;
    }

    //relationship with medications
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Medication> medications;

    @JsonManagedReference(value = "user-medication")
    @JsonIgnore
    public List<Medication> getMedications(){
        return medications;
    }

    public void setMedications(List<Medication> medications){
        this.medications = medications;
    }

    //relationship with vets
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Vet> vets;

    @JsonManagedReference(value = "user-vet")
    @JsonIgnore
    public List<Vet> getVets(){
        return vets;
    }

    public void setVets(List<Vet> vets){
        this.vets = vets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

}
