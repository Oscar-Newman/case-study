import { NextResponse } from "next/server";

// imports PostgreSQL database pool to query the local database
const pool = require('./db.js');

// Uses Employee ID in URL to retrieve all database fields for Employee object
export async function getEmployeeById (id) {
    
    try 
    {
        // Converts ID given as parameter and adds it to list to be used in parameterised query
        const value = [id];
        // Creation of Query where $1 represents parameterised parameter
        const query = `SELECT emp_id, firstName, middleName, lastName, to_char(date, 'YYYY-MM-DD'), position FROM employee WHERE emp_id = $1;`
        const results = await pool.query(query, value);

        // Checks if any results were returned from the database
        if (results.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404});
        }
        // Returns the data as JSON and status code
        return NextResponse.json(results.rows[0], {status: 200});
    }
    catch (err) 
    {
        // Returns error JSON body and status code
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

// Uses Employee ID in URL to delete database record for that Employee object
export async function deleteEmployeeById (id) {
    
    try 
    {
        const value = [id];
        const searchQuery = `SELECT * FROM employee WHERE emp_id = $1;`
        const searchResult = await pool.query(searchQuery, value);
        if (searchResult.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404});
        }
        else 
        {
           const deleteQuery = `DELETE FROM employee WHERE emp_id = $1;` 
           const results = await pool.query(deleteQuery, value);
           return NextResponse.json(results.rows, {status: 200});
        }     
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

// Uses Employee ID and the data from the UI form to update all database fields for Employee object
export async function updateEmployeeById (firstName, middleName, lastName, birthDate, position, id) 
{
    try 
    {   
        const values = [firstName, middleName, lastName, birthDate, position, parseInt(id)]; 
        console.log(birthDate);
        const query = `
            UPDATE employee
            SET firstname = $1, middlename = $2, lastname = $3, date = to_date($4, 'YYYY-MM-DD'), position = $5 
            WHERE emp_id = $6;`;

        const results = await pool.query(query, values);
        return NextResponse.json(results, {status: 200});   
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses the data from the UI form to post new data to the database and create new Employee object
export async function addEmployeeToDatabase (firstName, middleName, lastName, birthDate, position) 
{
    try 
    {    
        if (!middleName || typeof middleName !== 'string') 
        {
            const values = [firstName, lastName, birthDate, position]; 
            const query = `
                INSERT INTO employee (firstname, middlename, lastname, date, position) 
                VALUES ($1, NULL, $2, $3, $4) RETURNING emp_id;`;

            const results = await pool.query(query, values);
            return NextResponse.json(results, {status: 200});
        }
        else 
        {
            const values = [firstName, middleName, lastName, birthDate, position]; 
            const query = `
                INSERT INTO employee (firstname, middlename, lastname, date, position) 
                VALUES ($1, $2, $3, $4, $5) RETURNING emp_id;`;
            
            const results = await pool.query(query, values);
            return NextResponse.json(results, {status: 200});
        }

        
        
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses SQL to retrieve data for all Employee objects in the database
export async function getAllEmployees() 
{
    try 
    {
        const results = await pool.query(`SELECT emp_id, firstName, middleName, lastName, to_char(date, 'YYYY-MM-DD'), position FROM employee;`);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "No employees found"}), {status: 404};
        }
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses search params inputted into API URL from UI to find an employee object based on a combination of first name, last name and position
export async function searchForEmployee (firstName, lastName, position) 
{
    const values = [];
    let query = "SELECT emp_id, firstName, middleName, lastName, to_char(date, 'YYYY-MM-DD'), position FROM employee WHERE 1=1";
    let index = 1;
    try 
    {
        if (firstName)
        {
            query += ` AND firstname = $${index}`
            values.push(firstName);
            index++;
        } 
        if (lastName)
            {
                query += ` AND lastname = $${index}`
                values.push(lastName);
                index++;
            } 
        if (position)
            {
                query += ` AND position = $${index}`
                values.push(position);
                index++;
            } 
        const results = await pool.query(query, values);
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses SQL to retrieve data for all Compensation objects in the database
export async function getAllCompensations() 
{
    try 
    {
        const results = await pool.query(`SELECT * FROM compensation;`);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "No compensations found"}), {status: 404};
        }
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses the data from the UI form to post new data to the database and create new Compensation object
export async function addCompensationToDatabase (compType, amount, description, date, employeeId) 
{
    try 
    {    
        console.log("MADE IT HERE");
        const values = [compType, parseFloat(amount), description, date, parseInt(employeeId)]; 
        const query = `
            INSERT INTO compensation (type, amount, description, date, fk_employee) 
            VALUES ($1, $2, $3, $4, $5);`;

        const results = await pool.query(query, values);
        return NextResponse.json(results, {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses Compensation ID in URL to retrieve all database fields for Compensation object
export async function getCompensationById (id) 
{
    try
    {
        const value = [id];
        const query = `SELECT * FROM compensation WHERE comp_id = $1;`
        const results = await pool.query(query, value);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "Compensation not found"}, {status: 404});
        }
        return NextResponse.json(results.rows[0], {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses Employee ID in URL to delete database record for that Employee object
export async function deleteCompensationById (id)
{
    try 
    {
        const value = [id];
        const searchQuery = `SELECT * FROM compensation WHERE comp_id = $1;`
        const searchResult = await pool.query(searchQuery, value);
        if (searchResult.rows.length == 0) {
            return NextResponse.json({error : "Compensation not found"}, {status: 404});
        }
        else 
        {
           const deleteQuery = `DELETE FROM compensation WHERE comp_id = $1;` 
           const results = await pool.query(deleteQuery, value);
           return NextResponse.json(results.rows, {status: 200});
        }     
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses Compensation ID and the data from the UI form to update all database fields for Compensation object
export async function updateCompensationById (amount, description, id)
{
    try 
    {   
        const values = [amount, description, parseInt(id)]; 
        const query = `
            UPDATE compensation
            SET amount = $1, description = $2 
            WHERE comp_id = $3;`;

        const results = await pool.query(query, values);
        return NextResponse.json(results, {status: 200});   
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Uses the searchForCompensations API endpoint and calculates compensation for each month/year individually and returns JS Map
export function calculateTotalCompensationPerMonth(compensations) 
{
    //let perMonth = new Map();
    let compensationPerYearMonth = new Map();
    let index = 0;
    let monthId = 0;
    for (let i = 0; i < Object.keys(compensations).length; i++) 
    {
        const yearMonth = compensations[i].to_char;
        const amount = compensations[i].amount;
        console.log(yearMonth, amount);
        console.log(compensationPerYearMonth.size);
        let previousEntry = false;
        
        for (let x = 0; x < compensationPerYearMonth.size; x++) 
        {
            let monthToCheck = compensationPerYearMonth.get(x)["month"];
            
            console.log(yearMonth, monthToCheck);
            if (yearMonth == monthToCheck)
            {
                // Found that month was previously entered
                previousEntry = true;
                // Save which key the month is saved under
                monthId = x;
                break;
            }
        }
        console.log(previousEntry);
        console.log(compensationPerYearMonth.entries());
        if (previousEntry === true)
        {
            let currentCompensation = compensationPerYearMonth.get(monthId)["sum"];
            //Sum Calculation
            let sum = (parseFloat(currentCompensation) + 
                        parseFloat(amount)).toFixed(2);
            console.log(`sum ${sum}`);
            let dictValues = {"month": yearMonth, "sum": sum};
            compensationPerYearMonth.set(monthId, dictValues);
            index++;
        }
        else 
        {
            let dictValues = {"month": yearMonth, "sum": parseFloat(amount).toFixed(2)};
            compensationPerYearMonth.set(index, dictValues);
            index++;
            
        }
    }
    return compensationPerYearMonth;
}

// Uses SQL to find Compensation objects which are within a date range using the BETWEEN sql operator for a certain employee
// Values are passed using search params into endpoint
export async function searchForCompensations (startDate, endDate, employeeId) 
{
    try 
    {
        //Query the database to see compensations during this time frame
        const values = [parseInt(employeeId), startDate, endDate];
        const query = `SELECT to_char(date, 'YYYY-MM'), amount, comp_id FROM compensation 
                       WHERE fk_employee = $1 AND date BETWEEN 
                       (date_trunc('month', to_date($2, 'YYYY-MM-DD'))) AND 
                       (date_trunc('month', to_date($3, 'YYYY-MM-DD')) + interval '1 month' - interval '1 day');`;

        const results = await pool.query(query, values);
        //Summate the costs of each of these compensations per month to see total compensation each month
        const compensationPerYearMonth = calculateTotalCompensationPerMonth(results.rows);
        return NextResponse.json(Object.fromEntries(compensationPerYearMonth), {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

// Used by getCompensationsByEmployeeIdAndDate to extend API endpoint to return the total compensation for A SINGLE MONTH
// which the date is present within e.g., 09 aka September
export function calculateCompensationForSingleMonth(compensations) 
{
    let sumCompensation = 0;
    console.log(Object.keys(compensations).length);
    for (let i = 0; i < Object.keys(compensations).length; i++) 
    {   
        const amount = parseFloat(compensations[i].amount);
        sumCompensation += amount;
    }
    return sumCompensation.toFixed(2);

}

// Get all Compensation object data from the database for ONE compensation only
// Uses compensations/breakdown API where employeeId and date are passed as inputs into URL
export async function getCompensationsByEmployeeIdAndDate(employeeId, date)
{
    try 
    {
        const dateSeparated = date.split('-');
        const year = dateSeparated[0];
        const month = dateSeparated[1];
        console.log("YEAR MONTH",year, month);

        const values = [year, month, parseInt(employeeId)];
        const query = `SELECT * FROM compensation 
                    WHERE EXTRACT(YEAR FROM date) = $1 AND 
                    EXTRACT(MONTH FROM date) = $2 AND
                    fk_employee = $3;`

        const results = await pool.query(query, values);
        const monthCompensation = calculateCompensationForSingleMonth(results.rows);
        results.rows.push({ monthCompensation: monthCompensation});
        console.log(results.rows);
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err)
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }   
}
    