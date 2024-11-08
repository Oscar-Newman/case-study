'use client'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
    const router = useRouter();
    const [data, setData] = useState("");
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
      const formData = new FormData(event.target);

      try 
      {
        console.log(event.target);
        const response = await fetch('/api/employee/new', {
          method: 'POST',
          body: formData,
        })

        if (response.ok)
        {
          event.target.reset();
          setData(JSON.stringify(data));
          event.target.reset();

        }
        else 
        {
          event.target.reset();
          setData('Error submitting form!');
          event.target.reset();
        }
      }
      catch (error)
      {
        event.target.reset();
        setData('Error submitting form!');
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
        <p id="response">{ data }</p>
        <></>
        <br/>
        <button onClick={() => router.push('/')}>Home</button>
        </div>
      </main>
    </div>
    );
}
