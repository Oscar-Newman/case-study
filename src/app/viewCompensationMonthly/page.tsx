'use client'
import React from "react";
import { useRouter } from "next/navigation";


export default function viewCompensationMonthly() {
    const router = useRouter();
    return (
        <div>
            <main>
                <div>
                    <h1>View Compensation For A Specific Month</h1>
                    <form id="view compensation monthly">
                        <label>Month YYYY-MM</label>
                        <input type="month" id="month" name="month" pattern="[0-9]{4}-[0-9]{2}" required/><br />
                        <input type="submit" value="View Total Compensation" />
                    </form>
                    <p id="result"></p>
                    <button onClick={() => router.push('/')}>Home</button>
                </div>
            </main>
        </div>
    );
}