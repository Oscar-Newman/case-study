'use client'
import React, {useEffect} from "react";


export default function AddEmployee() {
    function getDate() {
      return (
        useEffect(() => {
            const d = new Date().toISOString().split("T")[0];
            //document.getElementById("response").innerHTML = new Date().toISOString().split("T")[0];
            document.getElementById("birthDate")!.setAttribute("max",d);
        })
      );
    }
    return (
    <div>
      <main>
        <div>
          <h1>Add Employee</h1>
          {getDate()}
          <form>
            <label>First name</label>
            <input type="text" id="firstName" name="firstName" required /><br />
            <label>Middle name</label>
            <input type="text" id="middleName" name="middleName" /><br />
            <label>Last name</label>
            <input type="text" id="lastName" name="lastName" required /><br />
            <label>Birthday</label>
            <input type="date" id="birthDate" name="birthDate" max="2000-10-01" required /><br />
            <label>Position</label>
            <input type="text" id="position" name="position" required /><br />
            <input type="submit" value="Add Employee" />
        </form>
        <p></p>
        <br/>
        <p id="response"></p>
        </div>
      </main>
    </div>
    );
}
