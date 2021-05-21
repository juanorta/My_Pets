package com.juan.projects.mypets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "vets")
public class Vet {
    @Id
    @GeneratedValue
    private Long id;
    private String vetName;
    private String phoneNumber;
    private String location;
    private String notes;

    //used to identify which pet is associated with vet in dashboard
    private String petName;
    private String petVetId;
    @Lob
    @JsonIgnore
    private byte[] data;

    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-vet")
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

    @JsonBackReference(value = "user-vet")
    public User getUser(){return user;}

    public void setUser(User user) {
        this.user = user;
    }

}
