'use client'
import React, {useEffect, FormEvent} from "react";

export default function viewEmployee() {
    function getDate() {
        return (
          useEffect(() => {
              const d = new Date().toISOString().split("T")[0];
              //document.getElementById("response").innerHTML = new Date().toISOString().split("T")[0];
              document.getElementById("birthDate")!.setAttribute("max",d);
          })
        );
      }
      async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submit form without clearing fields
        var firstname = document.forms["edit"]["firstName"].value;
        var middlename = document.forms["edit"]["middleName"].value;
        var lastname = document.forms["edit"]["lastName"].value;
        var birthdate = document.forms["edit"]["birthDate"].value;
        var position = document.forms["edit"]["position"].value;
        // from here make database call with values gathered
        var search = firstname+" "+middlename+" "+lastname+" "+birthdate+" "+position;
        document.getElementById("result")!.innerHTML = search;
        // above is just to test it gets the values
    }
    return (
        <div>
            <main>
                <div>
                    <h1>View Employee</h1>
                    {getDate()}
                    <form id="edit"  onSubmit={submitForm}>
                        <label>First name</label>
                        <input type="text" id="firstName" name="firstName" required/><br />
                        <label>Middle name</label>
                        <input type="text" id="middleName" name="middleName" /><br />
                        <label>Last name</label>
                        <input type="text" id="lastName" name="lastName" required /><br />
                        <label>Birthday</label>
                        <input type="date" id="birthDate" name="birthDate" max="2000-10-01" required /><br />
                        <label>Position</label>
                        <input type="text" id="position" name="position" required /><br />
                        <input type="submit" value="Edit Employee" />
                    </form>
                    <p id="result"></p>
                </div>
            </main>
        </div>
    );
}