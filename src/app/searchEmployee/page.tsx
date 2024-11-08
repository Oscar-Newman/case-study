'use client'
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";




export default function searchEmployee() {
    const router = useRouter();
    function clearForm() {
        return ((document.getElementById("search")! as HTMLFormElement).reset());
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submit form without clearing fields
        var firstname = document.forms["search"]["firstName"].value;
        var middlename = document.forms["search"]["middleName"].value;
        var lastname = document.forms["search"]["lastName"].value
        var position = document.forms["search"]["position"].value;
        // from here make database call with values gathered
        var search = firstname+" "+middlename+" "+lastname+" "+position;
        document.getElementById("result")!.innerHTML = search;
        // above is just to test it gets the values
    }

    return (
        <div>
        <main>
        <div>
        <h1>Search Employees</h1>
        <form id="search" onSubmit={submitForm}>
          <label>First name</label>
          <input type="text" id="firstName" name="firstName" /><br />
          <label>Last name</label>
          <input type="text" id="lastName" name="lastName" /><br />
          <label>Position</label>
          <input type="text" id="position" name="position" /><br />
          <input type="submit" value="Search Employee" />
        </form>
        <br/>
        <button onClick={() => clearForm()}>Clear</button>
        <br/>
        <p id="result"></p>
        </div>
        </main>
        </div>
    );
}
