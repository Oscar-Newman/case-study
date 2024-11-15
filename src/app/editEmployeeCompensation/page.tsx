'use client'
import React, { useState, useEffect }from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDateToShortDate } from "../../../lib/functions";


export default function EditEmployeeCompensation() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [compensationObject , setCompensationObject] = useState({
        comp_id: '',
        type: '',
        amount: '',
        description: '',
        date: '',
    });
    const searchParams = useSearchParams();

    function clearForm() {
        return ((document.getElementById("editCompensation")! as HTMLFormElement).reset());
    }

    // Runs every time page is loaded
    useEffect(() => {
        const fetchCompensationData = async () => {
            try 
            {
                // Use API URL to the details of the object
                const response = await fetch(`/api/compensation/id/${searchParams.get('comp_id')}`, {
                    method: 'GET',
                })
                if (response.ok)
                {
                    const data = await response.json();
                    console.log(data);
                    var smallDate = formatDateToShortDate(data.date);
                    data.date = smallDate;
                    console.log(data.comp_id, data.date, data.type, data.amount, data.description);
                    setCompensationObject(data);
                }   
                else
                {
                    setMessage('Failed to fetch compensation details!');
                }
            }
            catch (error)
            {
                setMessage('Failed to fetch compensation details!');
            }
        };
        fetchCompensationData();
    }, []);

    async function submitForm(event) {
        event.preventDefault()
        // submit form without clearing fields
        let formData = new FormData(event.target);
        
        try 
        {
            console.log(event.target);
            // Runs API call to update a compensation
            const response = await fetch(`/api/compensation/id/${searchParams.get('comp_id')}`, {
                method: 'PUT',
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
                    <h1>Edit Employee Compensation</h1>
                    <form id="editCompensation" onSubmit={ submitForm }>
                        <label>Type</label>
                        <select name="type" id="type" value={compensationObject.type} disabled
                        onChange={(e) =>
                            setCompensationObject({...compensationObject,  type: e.target.value})}>
                            <option value={"salary"}>Salary</option>
                            <option value={"bonus"}>Bonus</option>
                            <option value={"commission"}>Commission</option>
                            <option value={"allowance"}>Allowance</option>
                            <option value={"adjustment"}>Adjustment</option>
                        </select>
                        <label>Amount</label>
                        <input type="number" id="amount" name="amount" value={compensationObject.amount} required
                        onChange={(e) =>
                            setCompensationObject({...compensationObject,  amount: e.target.value})}/>
                        <br />
                        <label>Description</label>
                        <input type="text" id="description" name="description" value={compensationObject.description} 
                        onChange={(e) =>
                            setCompensationObject({...compensationObject,  description: e.target.value})}/>
                        <br />
                        <label>Date YYYY-MM</label>
                        <input type="month" id="payDate" name="payDate" pattern="[0-9]{4}-[0-9]{2}" 
                        value={compensationObject.date} required readOnly/><br />
                        <input type="submit" value="Edit Employee Compensation" />
                    </form>
                    <p id="response">{ message }</p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}