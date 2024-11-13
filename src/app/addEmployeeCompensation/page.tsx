'use client'
import React, {useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";
  
export default function AddEmployeeCompensation() {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Function to remove elements of form using its ID in HTML
    function clearForm() {
        return ((document.getElementById("addCompensation")! as HTMLFormElement).reset());
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        console.log(document.forms["addCompensation"]["description"].value == "");
        
        let employeeId = searchParams.get('emp_id');
        if (employeeId != null)
        {
          formData.append("employeeId", employeeId.toString());
        }
        else 
        {
          setMessage('Error submitting form - Cannot find Employee to assign Employee Compensation!');
          return;
        }
        
        
        // Change pay date from YYYY-MM in UI to YYYY-MM-FF
        const payDateFull = formatDateMonthToFullDate(formData.get("payDate"));
        formData.append("payDateFull", payDateFull);
        console.log(document.forms["addCompensation"]["amount"].value == 0)
        if ((document.forms["addCompensation"]["description"].value != "") || (document.forms["addCompensation"]["compType"].value == "salary")) {
          if ((document.forms["addCompensation"]["compType"].value != "adjustment") || (document.forms["addCompensation"]["amount"].value != 0)) {
            if ((document.forms["addCompensation"]["compType"].value == "adjustment") || (document.forms["addCompensation"]["compType"].value == "salary") || (document.forms["addCompensation"]["amount"].value > 0)) {
        try 
        {
          // Go to API to create new compensation using form data as input
          const response = await fetch('/api/compensation/new', {
          method: 'POST',
          body: formData,
          })
          if (response.ok)
          {
            setMessage('Form submitted successfully!');  
          }
          else 
          {
            setMessage('Error submitting form!');
          }
        }
        catch (error)
        {
          setMessage('Error submitting form!');
        }
        } else {
          setMessage("Amount must be greater than zero");
        }
        } else {
          setMessage("Adjustment can't be zero");
        }
        } else {
          setMessage('Non salary entries require a description');
        }
        
        clearForm();    
    }
    return (
        <div>
            <main>
                <div>
                    <h1>Add Employee Compensation</h1>
                    <form id="addCompensation" onSubmit={onSubmit}>
                        <label>Type</label>
                        <select name="compType" id="compType">
                            <option value={"salary"}>Salary</option>
                            <option value={"bonus"}>Bonus</option>
                            <option value={"commission"}>Commission</option>
                            <option value={"allowance"}>Allowance</option>
                            <option value={"adjustment"}>Adjustment</option>
                        </select>
                        <label>Amount</label>
                        <input type="number" id="amount" name="amount" required/><br />
                        <label>Description</label>
                        <input type="text" id="description" name="description" /><br />
                        <label>Date YYYY-MM</label>
                        <input type="month" id="payDate" name="payDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="Add Employee Compensation" />
                    </form>
                    <button onClick={() => router.push('/')}>Home</button>
                    <p id="message">{message}</p>
                </div>
            </main>
        </div>
    );
}
