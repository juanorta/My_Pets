package com.juan.projects.mypets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "medications")
public class Medication {
    @Id
    @GeneratedValue
    private Long id;
    private String medicationName;
    private String startDate;
    private String endDate;
    private String dosageInstructions;

    //used to associate pet in dashboard
    private String petName;
    private String petMedId;
    @Lob
    private byte[] data;

    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-medication")
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

    @JsonBackReference(value = "user-medication")
    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}

