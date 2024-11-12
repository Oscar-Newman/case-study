'use client'
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";


export default function viewCompensationMonthly() {
    const router = useRouter();
    const [data, setData] = useState("");
    const searchParams = useSearchParams();

    function updateResults(data: string) { 
      const empty = document.createElement("p");
      document.getElementById("result")!.replaceChildren(empty);     
      const results = JSON.parse(data);
      // -1 to not show month total
      for(let i = 0; i< results.length - 1; i++) {
          const output = document.createElement("button");
          let date = results[i].date;
          date = date.split("T");
          date = date[0];
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

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const compDate = formatDateMonthToFullDate(formData.get("date"));
        console.log(compDate);
        try 
        {
          console.log(event.target);
          // Call the API on submit
          const response = await fetch(`/api/compensations/search/breakdown/${searchParams.get('emp_id')}/date/${compDate}`, {
            method: 'GET'
          })
          const data = await response.json();
          console.log(data);

          if (response.ok && JSON.stringify(data) != '[]')
          {
            setData(JSON.stringify(data));
            updateResults(JSON.stringify(data));
            //displayError(JSON.stringify(data));
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
          event.target.reset();
          setData('Error completing search!');
          displayError('Error completing search!');
        }
        
      }
    
    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation For A Specific Month</h1>
                    <form id="view compensation monthly" onSubmit={onSubmit}>
                        <label>Month YYYY-MM</label>
                        <input type="month" id="date" name="date" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Compensation" />
                    </form>
                    <button onClick={() => router.push('/')}>Home</button>
                    <div id="result"></div>
                </div>
            </main>
        </div>
    );
}