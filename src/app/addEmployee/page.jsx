'use client'
import React, {useEffect} from "react";


export default function AddEmployee() {
    function getDate() {
        useEffect(() => {
            const d = new Date().toISOString().split("T")[0];
            //document.getElementById("response").innerHTML = new Date().toISOString().split("T")[0];
            document.getElementById("birthday").setAttribute("max",d);
        })
    }
    return (
    <div>
      <main>
        <div>
          <h1>Add Employee</h1>
          {getDate()}
          <form>
            <label>First name</label>
            <input type="text" id="fname" name="fname" required /><br />
            <label>Middle name</label>
            <input type="text" id="mname" name="mname" /><br />
            <label>Last name</label>
            <input type="text" id="lname" name="lname" required /><br />
            <label>Birthday</label>
            <input type="date" id="birthday" name="birthday" max="2000-10-01" required /><br />
            <label>Position</label>
            <input type="text" id="job" name="job" required /><br />
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
