package com.xliu.service;

import com.xliu.dao.UserDao;
import com.xliu.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    public User login(String username, String password) {
        return userDao.findByUsernameAndPassword(username,password);
    }
}
