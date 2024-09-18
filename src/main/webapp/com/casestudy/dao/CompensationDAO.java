package com.casestudy.dao;

import com.casestudy.util.ConnectionUtil;

import java.sql.SQLException;

import com.casestudy.model.Compensation;

public class CompensationDAO {

    public void save(Compensation compensation) {
        ConnectionUtil connection = ConnectionUtil.getConnection();
        
        try {
            Statement stmt = connection.prepareStatement("INSERT INTO Compensation (Type, Amount, Description, Date, EmployeeID) VALUES(?,?,?,?,?");
            stmt.setString(1, compensation.getType());
            stmt.setString(2, compensation.getAmount());
            stmt.setString(3, compensation.getDescription());
            stmt.setDate(4, compensation.getDate());
            stmt.setInt(5, compensation.getEmployeeId())
            stmt.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
