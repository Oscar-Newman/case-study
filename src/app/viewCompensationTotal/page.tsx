'use client'
import React from "react";
import { useRouter } from "next/navigation";


export default function viewCompensationTotal() {
    const router = useRouter();
    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation</h1>
                    <form id="view compensation total">
                        <label>Start Date YYYY-MM</label>
                        <input type="month" id="startDate" name="startDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <label>End Date YYYY-MM</label>
                        <input type="month" id="endDate" name="endDate" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Total Compensation" />
                    </form>
                    <p id="result"></p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}
