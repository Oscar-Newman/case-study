'use client'
import React, {useEffect, FormEvent, useState} from "react";
import { useRouter } from "next/navigation";


export default function viewEmployee() {
    const router = useRouter();
    const [message, setMessage] = useState("");

    function clearForm() {
        return ((document.getElementById("editEmployee")! as HTMLFormElement).reset());
    }

    function getDate() {
        return (
          useEffect(() => {
              const d = new Date().toISOString().split("T")[0];
              //document.getElementById("response").innerHTML = new Date().toISOString().split("T")[0];
              document.getElementById("birthDate")!.setAttribute("max",d);
          })
        );
      }
      async function submitForm(event) {
        event.preventDefault()
        // submit form without clearing fields
        let formData = new FormData(event.target);
        
        try 
        {
            console.log(event.target);
            // cannot HARD-CODE employee ID
            const response = await fetch(`/api/employee/id/15`, {
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
                    <h1>View Employee</h1>
                    {getDate()}
                    <form id="editEmployee"  onSubmit={submitForm}>
                        <label>First name</label>
                        <input type="text" id="firstName" name="firstName" required/><br />
                        <label>Middle name</label>
                        <input type="text" id="middleName" name="middleName" /><br />
                        <label>Last name</label>
                        <input type="text" id="lastName" name="lastName" required /><br />
                        <label>Birthday</label>
                        <input type="date" id="birthDate" name="birthDate" max="2000-10-01" required /><br />
                        <label>Position</label>
                        <input type="text" id="position" name="position" required /><br />
                        <input type="submit" value="Edit Employee" />
                    </form>
                    <p id="result">{ message }</p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}