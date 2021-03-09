package com.xliu.dao;

import com.xliu.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,String> {
    User findByUsernameAndPassword(String username, String password);
}
