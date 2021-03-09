package com.xliu.pojo;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Accessors(chain = true)
@Entity
@Table(name="tb_user")
public class User implements Serializable {
    @Id
    private String username;
    private String password;

    public User(String admin, String s) {
    }

    public User() {

    }
}
