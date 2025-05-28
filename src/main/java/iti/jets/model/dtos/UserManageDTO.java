package iti.jets.model.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class UserManageDTO {
    private Long userId;
    private String name;
    private String phoneNumber;
    private String email;
    private String job;
    private Date birthdate;

    public UserManageDTO() {
    }

    public UserManageDTO(Long id, String name, String phoneNumber, String email, String job, Date birthdate) {
        this.userId = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.job = job;
        this.birthdate = birthdate;
    }

//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getJob() {
//        return job;
//    }
//
//    public void setJob(String job) {
//        this.job = job;
//    }
//
//    public Date getBirthdate() {
//        return birthdate;
//    }
//
//    public void setBirthdate(Date birthdate) {
//        this.birthdate = birthdate;
//    }
}
