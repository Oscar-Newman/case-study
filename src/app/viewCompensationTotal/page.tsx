'use client'
import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";


export default function viewCompensationTotal() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState("");

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
            }
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
                    <h1>View Compensation</h1>
                    <form id="viewCompensationTotal" onSubmit={submitForm}>
                        <label>Start Date YYYY-MM</label>
                        <input type="month" id="startDate" name="startDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <label>End Date YYYY-MM</label>
                        <input type="month" id="endDate" name="endDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Total Compensation" />
                    </form>
                    <p id="result">{ data }</p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}
