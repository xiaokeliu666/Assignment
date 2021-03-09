package com.xliu.pojo;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Accessors(chain = true)
@Entity
@Table(name="tb_employee")
public class Employee {
    @Id
    private String id;
    private String name;
    private String surname;
    private String phone;
    private String address;
    private String title;

    public Employee() {
    }

    public Employee(String id, String name, String surname, String phone, String address, String title) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.title = title;
    }
}
