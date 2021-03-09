package com.xliu.dao;

import com.xliu.pojo.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface EmployeeDao extends PagingAndSortingRepository<Employee,String>, JpaSpecificationExecutor<Employee> {
    Page<Employee> findAll(Pageable pageable);

    void deleteById(String id);

    @Query(value = "SELECT * FROM tb_employee WHERE CONCAT(`id`,`name`,`surname`,`phone`) LIKE CONCAT('%',?1,'%') AND `title` LIKE CONCAT('%',?2,'%')", nativeQuery = true)
    Page<Employee> findByInfo(String info, String title, Pageable pageable);

    Optional<Employee> findById(String id);
}
