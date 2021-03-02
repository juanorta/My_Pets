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
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue
    private Long id;
    private String type;
    private String reason;
    private String date;
    private String time;
    private String amOrPm;
    private String vetOrGroomerName;
    private String location;
    private String notes;

    //used to identify which pet is associated with which appointment in dashboard
    private String petName;
    private String petAptId;


    //creating relationship with pet
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @JsonBackReference(value = "pet-appt")
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

    @JsonBackReference(value = "user-appt")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
