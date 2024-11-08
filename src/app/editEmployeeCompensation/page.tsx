'use client'
import React from "react";
import { useRouter } from "next/navigation";


export default function EditEmployeeCompensation() {
    const router = useRouter();
    return (
        <div>
            <main>
                <div>
                    <h1>Edit Employee Compensation</h1>
                    <form id="edit Compensation">
                        <label>Type</label>
                        <select name="type" id="type">
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
                        <input type="submit" value="Edit Employee Compensation" />
                    </form>
                    <p id="response"></p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}