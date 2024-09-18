package src.main.webapp.com.casestudy.dao;

import com.casestudy.util.ConnectionUtil;

import java.sql.SQLException;

import com.casestudy.model.Employee;

public class EmployeeDAO {

    public void save(Employee employee) {
        ConnectionUtil connection = ConnectionUtil.getConnection();
        
        try {
            Statement stmt = connection.prepareStatement("INSERT INTO Employee (FirstName, LastName, BirthDate, Position) VALUES(?,?,?,?)");
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getLastName());
            stmt.setDate(3, employee.getBirthDate());
            stmt.setString(4, employee.getPosition());
            stmt.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void saveWithMiddleName(Employee employee) {
        ConnectionUtil connection = ConnectionUtil.getConnection();
        
        try {
            Statement stmt = connection.prepareStatement("INSERT INTO Employee (FirstName, MiddleName, LastName, BirthDate, Position) VALUES(?,?,?,?,?)");
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getMiddleName());
            stmt.setString(3, employee.getLastName());
            stmt.setDate(3, employee.getBirthDate());
            stmt.setString(4, employee.getPosition());
            stmt.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
