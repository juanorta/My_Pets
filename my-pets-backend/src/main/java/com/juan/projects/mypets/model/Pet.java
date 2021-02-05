package com.juan.projects.mypets.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Pet {
    @Id
    @GeneratedValue
    private Long id;
    private String petName;
    private String petType;
    private String breed;
    private String sex;
    private int age;

    //creating relationship with user
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    //creating relationship with appointments
    @OneToMany(mappedBy = "pet", orphanRemoval = true)
    private List<Appointment> appointments;

    @JsonManagedReference(value = "pet-appt")
    public List<Appointment> getAppointments(){
        return appointments;
    }
    public void setAppointments(List<Appointment> appointments){
        this.appointments = appointments;
    }


    //creating relationships with weights
    @OneToMany(mappedBy = "pet", orphanRemoval = true)
    public List<Weight> weights;

    @JsonManagedReference(value = "pet-weight")
    public List<Weight> getWeights(){
        return weights;
    }

    public void setWeights(List<Weight> weights){
        this.weights = weights;
    }

    //creating relationship with food
    @OneToMany(mappedBy = "pet", orphanRemoval = true)
    public List<Food> food;

    @JsonManagedReference(value = "pet-food")
    public List<Food> getFood(){
        return food;
    }

    public void setFood(List<Food> food){
        this.food = food;
    }










}
