package com.casestudy.util;
import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.naming.Context;
import javax.naming.NamingException;

public class ConnectionUtil {

    public static Connection getConnection() {
        Connection connection = null;

        try {
            Context context = new InitialContext();
            DataSource dataSource = (DataSource) context.lookup("java:comp/env/casestudydb");
            connection = dataSource.getConnection();
        }
        catch(NamingException e) {
            e.printStackTrace();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }

        return connection;
    }

}
