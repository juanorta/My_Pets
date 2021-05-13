package com.juan.projects.mypets.controller;

import com.juan.projects.mypets.model.Appointment;
import com.juan.projects.mypets.repository.AppointmentRepository;
import com.juan.projects.mypets.repository.PetRepository;
import com.juan.projects.mypets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    //get all appointments for a pet
    @GetMapping("/users/{userId}/pets/{petId}/appointments")
    public List<Appointment> getAppointmentsByPet(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId){
        return appointmentRepository.findByPetId(petId);
    }

    //get all appointments for a user
    @GetMapping("/users/{userId}/appointments")
    public List<Appointment> getAppointmentsByUser(@PathVariable(value = "userId") Long userId){
        return appointmentRepository.findByUserId(userId);
    }

    //add appointment
    @PostMapping("/users/{userId}/pets/{petId}/addAppointment")
    public Appointment createAppointment(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @RequestBody Appointment appointment){
        return userRepository.findById(userId).map(user -> {
            appointment.setUser(user);
            return petRepository.findById(petId).map(pet -> {
                appointment.setPet(pet);

                return appointmentRepository.save(appointment);
            }).orElseThrow();
        }).orElseThrow();

    }

    //delete appointment
    @DeleteMapping("/users/{userId}/pets/{petId}/appointments/{apptId}")
    public String deleteAppointment(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "apptId") Long apptId){
        appointmentRepository.deleteById(apptId);
        return "appointment removed! " + apptId;
    }
    @DeleteMapping("/appointments/{apptId}")
    public String deleteAppt(@PathVariable(value = "apptId") Long apptId){
        appointmentRepository.deleteById(apptId);
        return "appointment removed!!!! " + apptId;
    }

    //update pet
    @PutMapping("/users/{userId}/pets/{petId}/appointments/{apptId}/update")
    public Appointment updateAppointment(@PathVariable(value = "userId") Long userId, @PathVariable(value = "petId") Long petId, @PathVariable(value = "apptId") Long apptId, @RequestBody Appointment appointment){
        Appointment existingAppointment = appointmentRepository.findById(appointment.getId()).orElse(null);
        existingAppointment.setDate(appointment.getDate());
        existingAppointment.setTime(appointment.getTime());
        existingAppointment.setAmOrPm(appointment.getAmOrPm());
        existingAppointment.setLocation(appointment.getLocation());
        existingAppointment.setVetOrGroomerName(appointment.getVetOrGroomerName());
        existingAppointment.setReason(appointment.getReason());
        existingAppointment.setNotes(appointment.getNotes());
        existingAppointment.setType(appointment.getType());

        //new
        existingAppointment.setPetName(appointment.getPetName());
        existingAppointment.setPetAptId(appointment.getPetAptId());
        existingAppointment.setData(appointment.getData());
        return appointmentRepository.save(existingAppointment);
    }

}
