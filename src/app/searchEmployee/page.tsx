'use client'
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";



export default function searchEmployee() {
    const router = useRouter();
    const [data, setData] = useState("");
    
    function clearForm() {
        (document.getElementById("search")! as HTMLFormElement).reset();
        const empty = document.createElement("p");
        document.getElementById("result")!.replaceChildren(empty);
    }

    function updateResults(data: string) { 
        const empty = document.createElement("p");
        document.getElementById("result")!.replaceChildren(empty);     
        const results = JSON.parse(data);
        for(let i = 0; i< results.length; i++) {
            const output = document.createElement("button");
            let middleName = results[i].middlename;
            if (middleName == null) {
                middleName = "";
            }
            const string = results[i].emp_id+" "+results[i].firstname+" "+middleName+" "+results[i].lastname+" "+results[i].to_char+" "+results[i].position;
            const node = document.createTextNode(string);
            output.appendChild(node);
            const outputArea = document.getElementById("result")!;
            outputArea.appendChild(output);
            output.onclick = () => viewEmployee(results[i].emp_id);
            output.className = "non_block";
        }
    }

    function displayError(message: string) {
        const output = document.createElement("p");
        const node = document.createTextNode(message);
        output.appendChild(node);
        const outputArea = document.getElementById("result")!;
        outputArea.replaceChildren(output);
    }

    function viewEmployee(id: string) {
        router.push('/viewEmployee?emp_id='+id);
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
                //displayError(JSON.stringify(data));
                updateResults(JSON.stringify(data));
            }
            // If call succeeded and no data was returned
            else if (JSON.stringify(data) == '[]')
            {
                setData('0 results found');
                displayError('0 results found');
            }
            else
            {
                setData('Error completing search!');
                displayError('Error completing search!');
            }
        }
        catch (error)
        {
            setData('Error completing search!');
            displayError('Error completing search!');
        }
        console.log(data);
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
          <input type="submit" value="Search Employee"/>
        </form>
        <br/>
        <button onClick={() => clearForm()}>Clear</button>
        <button onClick={() => router.push('/')}>Home</button>
        <br/>
        <div className="flex-container" id="result"></div>
        </div>
        </main>
        </div>
    );
}
