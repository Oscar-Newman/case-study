'use client'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    function getDate() {
      return (
        useEffect(() => {
            const d = new Date().toISOString().split("T")[0];
            document.getElementById("birthDate")!.setAttribute("max",d);
        })
      );
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      // Use form data where event is the ID of the HTML form
      const formData = new FormData(event.target);

      try 
      {
        // Call API URL to create a new employee
        console.log(event.target);
        const response = await fetch('/api/employee/new', {
          method: 'POST',
          body: formData,
        })

        if (response.ok)
        {
          // Clear the form
          event.target.reset();
          // Add response to UI variable using setter and useState()
          setMessage('Form submitted successfully!');
          event.target.reset();

        }
        else 
        {
          event.target.reset();
          setMessage('Error submitting form!');
          event.target.reset();
        }
      }
      catch (error)
      {
        event.target.reset();
        setMessage('Error submitting form!');
      }
      
    }
    
    return (
    <div>
      <main>
        <div>
          <h1>Add Employee</h1>
          {getDate()}
          <form onSubmit={onSubmit} id="formElem">
            <label>First name</label>
            <input type="text" id="firstName" name="firstName" required /><br />
            <label>Middle name</label>
            <input type="text" id="middleName" name="middleName" /><br />
            <label>Last name</label>
            <input type="text" id="lastName" name="lastName" required /><br />
            <label>Birthday</label>
            <input type="date" id="birthDate" name="birthDate" max="2000-10-01" required /><br />
            <label>Position</label>
            <input type="text" id="position" name="position" required /><br />
            <input type="submit" value="Add Employee" />
        </form>
        <p id="response">{ message }</p>
        <></>
        <br/>
        <button onClick={() => router.push('/')}>Home</button>
        </div>
      </main>
    </div>
    );
}
