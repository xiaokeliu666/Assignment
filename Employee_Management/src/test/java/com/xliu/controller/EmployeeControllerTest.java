package com.xliu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xliu.pojo.Condition;
import com.xliu.pojo.Employee;
import com.xliu.service.EmployeeService;
import com.xliu.util.JWTUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.Charset;
import java.util.*;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EmployeeService employeeService;

    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

    public static String token = "";

    public static ArrayList<Employee> list = new ArrayList<>();

//    public static List list = mock(List.class);

    @BeforeEach
    void init() {
        Map<String,String> payload = new HashMap<>();
        payload.put("username","admin");
        token = JWTUtil.getToken(payload);
        System.out.println("init():TOKEN HAS BEEN GENERATED:"+token);
        list.add(new Employee("IT001","Xiaoke","Liu","8732880212","255 Wilbrod Street","Developer"));
        list.add(new Employee("IT002","Scott","Liu","8738291345","234 Wilbrod Street","Tester"));
        list.add(new Employee("IT003","Sam","James","8744563821","324 Wilbrod Street","Developer"));
        list.add(new Employee("FN001","Linda","Green","8751234689","256 Somerset Street","Accountant"));
        list.add(new Employee("FN002","Roy","White","83718328327","483 Bank Street","Manager"));
    }

    @Test
    void list() throws Exception {
        Page<Employee> pagedEmployee = new PageImpl(list);
        when(employeeService.findAll("1","5")).thenReturn(pagedEmployee);
        MvcResult result = mockMvc.perform(get("/employee/1/5").contentType(APPLICATION_JSON_UTF8)
                .header("token", EmployeeControllerTest.token))
                .andReturn();
        String contentAsString = result.getResponse().getContentAsString();
        JSONObject res = new JSONObject(contentAsString);
        System.out.println(res.get("data"));
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void add() throws Exception {
        Map<String,String> newEmployee = new HashMap<>();
        newEmployee.put("id","FN003");
        newEmployee.put("name","Will");
        newEmployee.put("surname","Smith");
        newEmployee.put("phone","8745921378");
        newEmployee.put("address","75 Bank Street");
        newEmployee.put("title","Manager");

        when(employeeService.addEmployee(any(Employee.class))).thenReturn(true);
        MvcResult result = mockMvc.perform(post("/employee/")
                            .contentType(APPLICATION_JSON_UTF8).content(String.valueOf(new JSONObject(newEmployee)))
                            .header("token",token))
                            .andReturn();
        String contentAsString = result.getResponse().getContentAsString();
        System.out.println("[AddTest]ContentString:" + contentAsString);
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void delete() throws Exception {
        String id = "IT001";
        when(employeeService.deleteById(id)).thenReturn(true);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                .delete("/employee/{id}",id))
                .andExpect(status().isOk())
                .andReturn();
        String contentAsString = result.getResponse().getContentAsString();
        System.out.println("[DeleteTest]ContentString:" + contentAsString);
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void update() throws Exception {
        Employee e = new Employee("IT001","Scott","Sam","8732880212","255 Wilbrod Street","Developer");
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                .put("/employee/{id}",e.getId())
                .contentType(APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(e)))
                .andReturn();
        String contentAsString = result.getResponse().getContentAsString();
        System.out.println("[UpdateTest]ContentString:" + contentAsString);
        assertEquals(200,result.getResponse().getStatus());
    }

    @Test
    void findBy() throws Exception{
        Condition condition = new Condition("IT","Developer");
        List expectResult = new ArrayList<Employee>();
        expectResult.add(list.get(0));
        Page<Employee> pagedEmployee = new PageImpl(expectResult);
        when(employeeService.findByInfo("IT","Developer","1","5")).thenReturn(pagedEmployee);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                .post("/employee/1/5")
                .contentType(APPLICATION_JSON_UTF8)
                .header("token",token)
                .content(objectMapper.writeValueAsString(condition)))
                .andReturn();
        System.out.println(result);
        String contentAsString = result.getResponse().getContentAsString();
        System.out.println("[FindByTest]ContentString:" + contentAsString);
        assertEquals(200,result.getResponse().getStatus());
    }
}
