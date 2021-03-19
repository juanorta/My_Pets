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
@Table(name = "preventative")
public class Preventative {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String type;
    private String lastGiven;
    private String dueNext;
    private String notes;

    //used to associate with pet in dahsboard
    private String petName;
    private Long petPreventativeId;
    @Lob
    private byte[] data;

    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-preventative")
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

    @JsonBackReference(value = "user-preventative")
    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

}
