package src.main.webapp.com.casestudy.dao;

import com.casestudy.util.ConnectionUtil;

import java.sql.SQLException;
import java.sql.ResultSet;
import com.casestudy.model.Employee;

public class EmployeeDAO {

    public boolean checkIfExistingEmployee(Employee employee) {
        ConnectionUtil connection = ConnectionUtil.getConnection();

        try{
            Statement stmt = connection.prepareStatement("SELECT * FROM Employee WHERE FirstName = ?, MiddleName = ?, LastName = ?, BirthDate = ?");
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getMiddleName());
            stmt.setString(3, employee.getLastName());
            stmt.setString(4, employee.getBirthDate());
            
            ResultSet rs = stmt.executeQuery();
            
            /* Check if Result Set is empty */
            if(!rs.isBeforeFirst()) {
                return false;
            }
            else {
                return true;
            }   
        }
    }

    public boolean save(Employee employee) {
        ConnectionUtil connection = ConnectionUtil.getConnection();
        
        try {
            Statement stmt = connection.prepareStatement("INSERT INTO Employee (FirstName, LastName, BirthDate, Position) VALUES(?,?,?,?)");
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getLastName());
            stmt.setDate(3, employee.getBirthDate());
            stmt.setString(4, employee.getPosition());
            stmt.executeUpdate();
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean saveWithMiddleName(Employee employee) {
        ConnectionUtil connection = ConnectionUtil.getConnection();
        
        try {
            Statement stmt = connection.prepareStatement("INSERT INTO Employee (FirstName, MiddleName, LastName, BirthDate, Position) VALUES(?,?,?,?,?)");
            stmt.setString(1, employee.getFirstName());
            stmt.setString(2, employee.getMiddleName());
            stmt.setString(3, employee.getLastName());
            stmt.setDate(3, employee.getBirthDate());
            stmt.setString(4, employee.getPosition());
            stmt.executeUpdate();
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}
