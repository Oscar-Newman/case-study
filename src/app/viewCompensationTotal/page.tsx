'use client'
import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";


export default function viewCompensationTotal() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState("");


    function updateResults(data: string) { 
        const empty = document.createElement("p");
        document.getElementById("result")!.replaceChildren(empty);     
        const results = JSON.parse(data);
        // -1 to not show month total
        for(let i = 0; i< results.length - 1; i++) {
            const output = document.createElement("button");
            const string = results[i].type+" "+results[i].amount+" "+results[i].description+" "+date;
            const node = document.createTextNode(string);
            output.appendChild(node);
            const outputArea = document.getElementById("result")!;
            outputArea.appendChild(output);
            output.onclick = () => editEmployeeCompensation(results[i].comp_id);
        }
        const totalParagraph = document.createElement("p");
        const total = "Total:"+results[results.length - 1].monthCompensation;
        const totalNode = document.createTextNode(total);
        totalParagraph.appendChild(totalNode);
        document.getElementById("result")!.appendChild(totalParagraph);
      }
      function displayError(message: string) {
        const output = document.createElement("p");
        const node = document.createTextNode(message);
        output.appendChild(node);
        const outputArea = document.getElementById("result")!;
        outputArea.replaceChildren(output);
      }
  
      function editEmployeeCompensation(id: string) {
        router.push('/editEmployeeCompensation?comp_id='+id);
      }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // submit form without clearing fields
        var startDate = document.forms["viewCompensationTotal"]["startDate"].value;
        var endDate = document.forms["viewCompensationTotal"]["endDate"].value;
        var employeeId = searchParams.get('emp_id');
        
        startDate = formatDateMonthToFullDate(startDate);
        endDate = formatDateMonthToFullDate(endDate);

        var apiCall = `http://localhost:3000/api/compensations/search?`;
        let firstParam = true; 
        if (startDate && !(startDate.length === 0))
        {
            firstParam = false;
            apiCall += `startDate=${startDate}`;
        }
        if (endDate && firstParam == false && !(endDate.length === 0))
        {
            apiCall += `&endDate=${endDate}`;
        }
        else if (endDate && firstParam == true && !(endDate.length === 0))
        {
            firstParam = false;
            apiCall += `endDate=${endDate}`;
        }
        if (employeeId && firstParam == false && !(employeeId.length === 0))
        {
            apiCall += `&employeeId=${employeeId}`;
        }
        else if (employeeId && firstParam == true && !(employeeId.length === 0))
        {
            apiCall += `employeeId=${employeeId}`;
        }
        else 
        {
            setData('Error completing search - Employee was NOT found!');
        }
        
        try 
        {
            const response = await fetch(apiCall, 
                {
                    method: 'GET'
                }
            );
            const data = await response.json();

            if (response.ok && JSON.stringify(data) != '[]')
            {
                setData(JSON.stringify(data));
                //updateResults(JSON.stringify(data));
                displayError(JSON.stringify(data));
            }
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
        //clearForm();
    }

    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation</h1>
                    <form id="viewCompensationTotal" onSubmit={submitForm}>
                        <label>Start Date YYYY-MM</label>
                        <input type="month" id="startDate" name="startDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <label>End Date YYYY-MM</label>
                        <input type="month" id="endDate" name="endDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Total Compensation" />
                    </form>
                    <p id="result">{ data }</p>
                    <button onClick={() => router.push(`/viewCompensationMonthly?emp_id=${searchParams.get('emp_id')}`)}>View Monthly Compensation</button>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}
