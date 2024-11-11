'use client'
import React, {useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function viewEmployee() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("");
    // Object to save data to
    // Field names must match what is in database
    const [employee , setEmployee] = useState({
        emp_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        to_char: '',
        position: '',
    });

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

      useEffect(() => {
        const fetchEmployeeData = async () => {
            try 
            {
                const response = await fetch(`/api/employee/id/${searchParams.get('emp_id')}`, {
                    method: 'GET',
                })
                if (response.ok)
                {
                    const data = await response.json();
                    setEmployee(data);
                }
                else
                {
                    setMessage('Failed to fetch employee details!');
                }
            }
            catch (error)
            {
                setMessage('Failed to fetch employee details!');
            }
        };
        fetchEmployeeData();
    }, []);
    
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
    //max="2000-10-01"
    return (
        <div>
            <main>
                <div>
                    <h1>View Employee</h1>
                    {getDate()}
                    <form id="editEmployee"  onSubmit={submitForm}>
                        <label>Employee UUID</label>
                        <input type="text" id="empId" name="empId" value={employee.emp_id} required disabled/>
                        <br />
                        <label>First name</label>
                        <input type="text" id="firstName" name="firstName" value={employee.firstname} required
                        onChange={(e) =>
                            setEmployee({...employee,  firstname: e.target.value})}/>
                        <br />
                        <label>Middle name</label>
                        <input type="text" id="middleName" name="middleName" value={employee.middlename} 
                        onChange={(e) =>
                            setEmployee({...employee,  middlename: e.target.value})}/>
                        <br />
                        <label>Last name</label>
                        <input type="text" id="lastName" name="lastName" value={employee.lastname} required 
                        onChange={(e) =>
                            setEmployee({...employee,  lastname: e.target.value})}/>
                        <br />
                        <label>Birthday</label>
                        <input type="date" id="birthDate" name="birthDate" value={employee.to_char} required
                        onChange={(e) =>
                            setEmployee({...employee,  to_char: e.target.value})}/>
                        <br />
                        <label>Position</label>
                        <input type="text" id="position" name="position" value={employee.position} required
                        onChange={(e) =>
                            setEmployee({...employee,  position: e.target.value})}/>
                        <br />
                        <input type="submit" value="Edit Employee" />
                    </form>
                    <p id="result">{ message }</p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}