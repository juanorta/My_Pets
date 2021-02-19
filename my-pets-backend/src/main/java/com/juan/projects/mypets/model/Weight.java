package com.juan.projects.mypets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "weights")
public class Weight {
    @Id
    @GeneratedValue
    private Long id;
    private float weightValue;
//    private float lastWeightValue;
//    private float weightChange;
    private String unit;
    private String dateWeighed;
//    private String lastDateWeighed;
    private String notes;

    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-weight")
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

    @JsonBackReference(value = "user-weight")
    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

}
