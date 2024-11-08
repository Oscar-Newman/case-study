'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { formatDateMonthToFullDate } from "../../../lib/functions";
  
export default function AddEmployeeCompensation() {
    const [message, setMessage] = useState("");
    const router = useRouter();

    function clearForm() {
        return ((document.getElementById("addCompensation")! as HTMLFormElement).reset());
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        formData.append("employeeId", "1");
        
        const payDateFull = formatDateMonthToFullDate(formData.get("payDate"));
        formData.append("payDateFull", payDateFull);

        try 
        {
          console.log(event.target);
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
                            <option value={"Salary"}>Salary</option>
                            <option value={"Bonus"}>Bonus</option>
                            <option value={"Commission"}>Commission</option>
                            <option value={"Allowance"}>Allowance</option>
                            <option value={"Adjustment"}>Adjustment</option>
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
