<%@ page language="java" contentType="text/html; charset=ISO-8859-1" 
    pageEncoding="ISO-8859-1"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <title>
            Add Employee
        </title>
    </head>
    <body>
        <h1>Add Employee</h1>
        <form>
            <label for="fname">First name</label>
            <input type="text" id="fname" name="fname" required><br>
            <label for="mname">Middle name</label>
            <input type="text" id="mname" name="mname"><br>
            <label for="lname">Last name</label>
            <input type="text" id="lname" name="lname" required><br>
            <label for="birthday">Birthday</label>
            <input type="date" id="birthday" name="birthday" max="2000-10-01" required><br>
            <label for="job">Position</label>
            <input type="text" id="job" name="job" required><br>
            <input type="submit" value="Add Employee">
        </form>
        <p></p>
        <script>
            const d = new Date().toISOString().split("T")[0];
            document.getElementById("birthday").setAttribute("max",d);
        </script>
        <br>
        <button class="button button1" on-click="">Add Employee</button> <br>
        <c:set var="response" scope="session" value="${response}"/>
        <p id="response">${response}</p>
        
    </body>
</html>