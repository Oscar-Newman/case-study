'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";


export default function viewCompensationMonthly() {
    const router = useRouter();
    const [data, setData] = useState("");
    const [passedDate, setPassedDate] = useState("");
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
          output.className = "non_block";
      }
      const totalParagraph = document.createElement("p");
      const total = "Total:"+results[results.length - 1].monthCompensation;
      const totalNode = document.createTextNode(total);
      totalParagraph.appendChild(totalNode);
      document.getElementById("total")!.appendChild(totalParagraph);
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

  useEffect(() => {
    const loadDateFromViewCompensationTotal = async () => {
      try
      {
        let month_year = searchParams.get("year_month");
        if (month_year && !(month_year.length === 0))
        {
          setPassedDate(month_year);
          const compDate = formatDateMonthToFullDate(month_year);
          getResultsFromDatabase(compDate);
        }
      }
      catch (error)
      {
        displayError(`Error finding compensation for search!`);
      }
    };
    loadDateFromViewCompensationTotal();
  }, []);

  const onSubmit = async (event) => 
    {
      event?.preventDefault();
      const formData = new FormData(event?.target);
      const compDate = formatDateMonthToFullDate(formData.get("date"));
      console.log(`NORMAL COMP DATE ${compDate}`);
      getResultsFromDatabase(compDate);
    }

    async function getResultsFromDatabase(compDate)
    {
      try 
      {
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
        setData('Error completing search!');
        displayError('Error completing search!');
      }
    }
  
    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation For A Specific Month</h1>
                    <form id="viewCompensationMonthly" onSubmit={onSubmit}>
                        <label>Month YYYY-MM</label>
                        <input type="month" id="date" name="date" pattern="[0-9]{4}-[0-9]{2}" value={passedDate} required
                        onChange={(e) =>
                          setPassedDate(e.target.value)}/>
                        <br />
                        <input type="submit" value="View Compensation" />
                    </form>
                    <button onClick={() => router.push('/')}>Home</button>
                    <div className="flex-container" id="result"></div>
                    <p id="total"></p>
                </div>
            </main>
        </div>
    );
}