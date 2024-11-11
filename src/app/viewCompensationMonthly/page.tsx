'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";


export default function viewCompensationMonthly() {
    const router = useRouter();
    const [data, setData] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const compDate = formatDateMonthToFullDate(formData.get("date"));
        console.log(compDate);
        try 
        {
          console.log(event.target);
          // CANNOT hard code employee ID
          // Call the API on submit
          const response = await fetch(`/api/compensations/search/breakdown/1/date/${compDate}`, {
            method: 'GET'
          })
          const data = await response.json();
          console.log(data);

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
          event.target.reset();
          setData('Error completing search!');
        }
        
      }
    
    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation For A Specific Month</h1>
                    <form id="view compensation monthly" onSubmit={onSubmit}>
                        <label>Month YYYY-MM</label>
                        <input type="date" id="date" name="date" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Total Compensation" />
                    </form>
                    <p id="result">{ data }</p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}