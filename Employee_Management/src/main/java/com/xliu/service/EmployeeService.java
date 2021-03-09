package com.xliu.service;

import com.xliu.dao.EmployeeDao;
import com.xliu.pojo.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    public Page<Employee> findAll(String pageIndex, String pageSize){
        Pageable pageable = PageRequest.of(Integer.parseInt(pageIndex)-1,Integer.parseInt(pageSize));
        return employeeDao.findAll(pageable);
    };

    public Page<Employee> findByInfo(String info, String title, String pageIndex, String pageSize){
        Pageable pageable = PageRequest.of(Integer.parseInt(pageIndex)-1,Integer.parseInt(pageSize));
        return employeeDao.findByInfo(info, title, pageable);
    };

    public Optional<Employee> findById(String id) {
        return employeeDao.findById(id);
    }

    public boolean addEmployee(Employee employee) {
        Optional<Employee> findOne = findById(employee.getId());
        if(findOne.isPresent()) {
            return false;
        }
        employeeDao.save(employee);
        return true;
    }

    @Transactional
    public boolean deleteById(String id) {
        Optional<Employee> findOne = findById(id);
        if(findOne.isPresent()) {
            return false;
        }
        employeeDao.deleteById(id);
        return true;
    }

    public void updateById(Employee employee) {
        employeeDao.save(employee);
    }


}
