package com.juan.projects.mypets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue
    private Long id;
    private String foodName;
    private String whereToBuy;
    private String type;
    private String wetOrDry;
    private String flavor;
    private String notes;

    //used to identify which pet is associated with food in dashboard
    private String petName;
    private String petFoodId;

    @Lob
    private byte[] data;


    //creating relationship with foodImage
    @OneToOne(mappedBy = "food", orphanRemoval = true)
    private FoodImage foodImage;

    @JsonManagedReference(value = "food-foodImage")
    public FoodImage getFoodImage(){ return foodImage;}

    public void setFoodImage(FoodImage foodImage){
        this.foodImage = foodImage;
    }



    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-food")
    public Pet getPet(){
        return pet;
    }

    public void setPet(Pet pet){
        this.pet = pet;
    }

    //creating relationship with user
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference(value = "user-food")
    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }



}
