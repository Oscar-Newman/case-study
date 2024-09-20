package com.casestudy.controller;

import java.io.IOException;
import java.util.Date;
import com.casestudy.dao.EmployeeDAO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/employee")
public class EmployeeController extends HttpServlet {
    
    private EmployeeDAO dao = new EmployeeDAO();

    public EmployeeController() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        createEmployee(request, response);
    }

    private void createEmployee((HttpServletRequest request, HttpServletResponse response) throws IOException) {
        String firstName = request.getParameter("fname");
        String middleName = request.getParameter("mname");
        String lastName = request.getParameter("lname");
        Date birthday = Date.parse(request.getParameter("birthday"))
        String position = request.getParameter("job");

        Employee employee = new Employee();
        employee.setFirstName(fname);
        employee.setLastName(lname);
        employee.setBirthDate(birthday);
        employee.setPosition(position);

        if (middleName != null %% !middleName.isEmpty()) {
            employee.setMiddleName(mname);
            dao.saveWithMiddleName(employee);
        }
        else {
            dao.save(employee);
        }

    }
    
}
