import React from "react";

export default function AddEmployeeCompensation() {
    return (
        <div>
            <main>
                <div>
                    <h1>Add Employee Compensation</h1>
                    <form id="add Compensation">
                        <label>Type</label>
                        <select name="type" id="type">
                            <option value={"Salary"}>Salary</option>
                            <option value={"Bonus"}>Bonus</option>
                            <option value={"Commission"}>Commission</option>
                            <option value={"Allowance"}>Allowance</option>
                            <option value={"Adjustment"}>Adjustment</option>
                        </select>
                        <label>Amount</label>
                        <input type="number" id="amount" name="amount" /><br />
                        <label>Description</label>
                        <input type="text" id="description" name="description" /><br />
                        <label>Date YYYY-MM</label>
                        <input type="month" id="payDate" name="payDate" pattern="[0-9]{4}-[0-9]{2}" /><br />
                        <input type="submit" value="Add Employee Compensation" />
                    </form>
                </div>
            </main>
        </div>
    );
}