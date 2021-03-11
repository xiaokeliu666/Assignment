package com.xliu.controller;

import com.xliu.pojo.Condition;
import com.xliu.pojo.Employee;
import com.xliu.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/employee")
//@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{pageIndex}/{pageSize}")
    public Map<String,Object> list(@PathVariable String pageIndex, @PathVariable String pageSize) {
        Page<Employee> findAll = employeeService.findAll(pageIndex, pageSize);
        Map<String,Object> res = new HashMap<>();
        res.put("status",true);
        res.put("msg","success");
        res.put("data",findAll);
        return res;
    }

    @PostMapping("/")
    public Map<String,Object> add(@RequestBody Employee employee) {
        Map<String,Object> res = new HashMap<>();
        if(!employeeService.addEmployee(employee)) {
            res.put("status",false);
            res.put("msg","Id existed");
        } else if (employee.getId()==null || employee.getName()==null) {
            res.put("status",false);
            res.put("msg","Id and name required");
        } else {
            res.put("status",true);
            res.put("msg","Success!");
        }
        return res;
    }

    @DeleteMapping("/{id}")
    public Map<String,Object> delete(@PathVariable String id) {
        Map<String,Object> res = new HashMap<>();
        if (employeeService.deleteById(id)) {
            res.put("status",true);
            res.put("msg",id+" deleted!");
        } else {
            res.put("status",false);
            res.put("msg","Invalid Employee!");
        }
        return res;
    }

    @PutMapping("/{id}")
    public Map<String,Object> update(@PathVariable String id, @RequestBody Employee employee) {
        employee.setId(id);
        Map<String,Object> res = new HashMap<>();
        try{
            employeeService.updateById(employee);
        } catch (Exception e) {
            res.put("status",false);
            res.put("msg","Invalid Operation!");
            return res;
        }
        res.put("status",true);
        res.put("msg",id+" updated!");
        return res;
    }

    // Here is a problem:
    // Since MySQL is not case sensitive on Windows by default, if you wanna find employee list of IT department by inputting "IT",
    // you may get people whose name contains "it", such as Smith.
    // However, if we deploy this project on a Linux server and MySQL is case sensitive on Linux, "Smith" won't show up in the result.
    @PostMapping("/{pageIndex}/{pageSize}")
    public Map<String,Object> findBy(@RequestBody Condition condition, @PathVariable String pageIndex, @PathVariable String pageSize) {
        Map<String,Object> res = new HashMap<>();
        Page<Employee> findByInfo = employeeService.findByInfo(condition.getInfo(), condition.getTitle(), pageIndex, pageSize);
        res.put("status",true);
        res.put("msg","success");
        res.put("data",findByInfo);
        return res;
    }
}
