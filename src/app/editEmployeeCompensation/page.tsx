'use client'
import React, { useState, useEffect }from "react";
import { useRouter } from "next/navigation";


export default function EditEmployeeCompensation() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [compensationObject , setCompensationObject] = useState({
        compId: '',
        compType: '',
        amount: '',
        description: '',
        date: '',
    });

    function clearForm() {
        return ((document.getElementById("editCompensation")! as HTMLFormElement).reset());
    }

    function formatDate(databaseDate: string) {
        const [year, month] = databaseDate.split("-");
        return `${year}-${month}`;
    }

    useEffect(() => {
        const fetchCompensationData = async () => {
            try 
            {
                const response = await fetch(`/api/compensation/id/18`, {
                    method: 'GET',
                })
                if (response.ok)
                {
                    const data = await response.json();
                    var smallDate = formatDate(data.date);
                    data.date = smallDate;
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

            // cannot HARD-CODE compensation ID
            const response = await fetch(`/api/compensation/id/18`, {
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
                        <select name="type" id="type" value={compensationObject.compType} disabled>
                            <option value={"Salary"}>Salary</option>
                            <option value={"Bonus"}>Bonus</option>
                            <option value={"Commission"}>Commission</option>
                            <option value={"Allowance"}>Allowance</option>
                            <option value={"Adjustment"}>Adjustment</option>
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