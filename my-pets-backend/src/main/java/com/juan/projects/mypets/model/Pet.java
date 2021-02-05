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

    @JsonManagedReference
    public List<Appointment> getAppointments(){
        return appointments;
    }
    public void setAppointments(List<Appointment> appointments){
        this.appointments = appointments;
    }





}
