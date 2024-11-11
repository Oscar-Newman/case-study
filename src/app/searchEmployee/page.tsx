'use client'
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";



export default function searchEmployee() {
    const router = useRouter();
    const [data, setData] = useState("");
    
    function clearForm() {
        return ((document.getElementById("search")! as HTMLFormElement).reset());
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submit form without clearing fields
        // Get values from the form
        var firstname = document.forms["search"]["firstName"].value;
        var lastname = document.forms["search"]["lastName"].value
        var position = document.forms["search"]["position"].value;

        // Standard API call for search without any search params
        var apiCall = `http://localhost:3000/api/employees/search?`;
        // bool to check if the parameter is the first one or added on at the end
        let firstParam = true; 
        // Checks if value firstName is truthy (does exist and is not null) and is not ""
        if (firstname && !(firstname.length === 0))
        {
            // Reset boolean so next parameter will require a &
            firstParam = false;
            // Concatenate text to end of API call
            apiCall += `firstName=${firstname}`;
        }
        if (lastname && firstParam == false && !(firstname.length === 0))
        {
            apiCall += `&lastName=${lastname}`;
        }
        else if (lastname && firstParam == true && !(lastname.length === 0))
        {
            // Reset boolean so next parameter will require a &
            firstParam = false;
            apiCall += `lastName=${lastname}`;
        }
        if (position && firstParam == false && !(position.length === 0))
        {
            apiCall += `&position=${position}`;
        }
        else if (position && firstParam == true && !(position.length === 0))
        {
            apiCall += `position=${position}`;
        }
        
        try 
        {
            // Use crafted API call to GET items from the database
            const response = await fetch(apiCall, 
                {
                    method: 'GET'
                }
            );
            const data = await response.json();
            console.log(data);
            // If API call returned some data
            if (response.ok && JSON.stringify(data) != '[]')
            {
                setData(JSON.stringify(data));
            }
            // If call succeeded and no data was returned
            else if (JSON.stringify(data) == '[]')
            {
                setData('0 results found');
            }
            else
            {
                setData('Error completing search!');
            }

        }
        catch (error)
        {
            setData('Error completing search!');
        }
        //clearForm();
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
        <button onClick={() => router.push('/')}>Home</button>
        <button onClick={() => router.push(`/viewEmployee?emp_id=${1}`)}>View Employee</button>
        <br/>
        <p id="result">{data}</p>
        </div>
        </main>
        </div>
    );
}
