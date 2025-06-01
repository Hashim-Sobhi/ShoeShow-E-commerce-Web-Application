package iti.jets.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "UserAddress")
@Data
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "state", nullable = false, length = 50)
    private String state;

    @Column(name = "street", nullable = false, columnDefinition = "TEXT")
    private String street;

    @Column(name = "building_number", nullable = false)
    private Integer buildingNumber;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault;

}