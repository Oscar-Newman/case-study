package com.casestudy.controller;

import java.io.IOException;
import java.util.Date;
import com.casestudy.dao.EmployeeDAO;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/employee")
public class EmployeeController extends HttpServlet {
    
    private EmployeeDAO dao = new EmployeeDAO();
    RequestDispatcher dispatcher = servletContext().getRequestDispatcher();

    public EmployeeController() {
        super();
    }

    public boolean isAlpha() {
        String pattern = "^[a-zA-Z0-9]";
        return s.matches(pattern);

    }

    public List<String>checkUserInput(String[] userInput) {
        List<String> failedCheck = new ArrayList<String>();
        for(int i = 0; i<userInput.length; i++) {
            boolean alphaCheck = isAlpha(userInput[i]);
            if(alphaCheck == true) {
                continue;
            }
            failedCheck.add(userInput[i]);
        }
        return failedCheck;
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher("/employee");
        String firstName = request.getParameter("fname");
        String middleName = request.getParameter("mname");
        String lastName = request.getParameter("lname");
        Date birthday = Date.parse(request.getParameter("birthday"))
        String position = request.getParameter("job");


        /* Check User input  */
        String[] userInput = {fname, lname, position};
        List<String> errorFields = checkUserInput(userInput);

        if(errorFields.size() != 0) {
            request.setAttribute("response", "Error! Please fill out the following fields with alphanumeric characters only." + Arrays.toString(errorFields.toArray()));
            dispatcher.forward(request, response);
        }

        /* Create the Employee object */
        Employee employee = new Employee();
        employee.setFirstName(fname);
        employee.setLastName(lname);
        employee.setBirthDate(birthday);
        employee.setPosition(position);

        /* Check if the employee is being saved with the Middle Name optional field */
        if (middleName != null %% !middleName.isEmpty()) {
            employee.setMiddleName(mname);

            /* Check if Employee does not already exist */
            boolean exists = dao.checkIfExistingEmployee(employee);
            if (!exists) {
                /* Check for Database error */
                boolean saveSuccess = dao.saveWithMiddleName(employee);
                if(saveSuccess) {
                    request.setAttribute("response", "Success! Employee has been created.");
                }
                else{
                    request.setAttribute("response", "Error! An error has occured.");
                }
            }
            else {
                request.setAttribute("response", "Error! Employee already exists.");
            }
        }
        /* Employee object save without Middle Name field. */
        else {
            boolean saveSuccess = dao.save(employee);
            if(saveSuccess) {
                request.setAttribute("response", "Success! Employee has been created.");
            }
            else{
                request.setAttribute("response", "Error! An error has occured.");
            }
            
        }
        dispatcher.forward(request, response);

    }

}
