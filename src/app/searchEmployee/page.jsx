'use client'
import React from "react";



export default function searchEmployee() {
    function clearForm() {
        return (document.getElementById("search").reset());
    }

    function submitForm() {
        // submit form without clearing fields
        var firstname = document.forms["search"]["fname"].value;
        var middlename = document.forms["search"]["mname"].value;
        var lastname = document.forms["search"]["lname"].value
        var position = document.forms["search"]["job"].value;
        // from here make database call with values gathered
        var search = firstname+" "+middlename+" "+lastname+" "+position;
        document.getElementById("result").innerHTML = search;
        // above is just to test it gets the values
    }

    return (
        <div>
        <main>
        <div>
        <h1>Search Employees</h1>
        <form id="search">
          <label>First name</label>
          <input type="text" id="fname" name="fname" required /><br />
          <label>Middle name</label>
          <input type="text" id="mname" name="mname" /><br />
          <label>Last name</label>
          <input type="text" id="lname" name="lname" required /><br />
          <label>Position</label>
          <input type="text" id="job" name="job" required /><br />
        </form>
        <button onClick={() => submitForm()}>Search Employee</button>
        <br/>
        <button onClick={() => clearForm()}>Clear</button>
        <br/>
        <p id="result"></p>
        </div>
        </main>
        </div>
    );
}
