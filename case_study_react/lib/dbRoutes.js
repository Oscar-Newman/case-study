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
        const query = `SELECT * FROM employee WHERE emp_id = $1;`
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
        const query = `
            UPDATE employee
            SET firstname = $1, middlename = $2, lastname = $3, date = $4, position = $5 
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
        const results = await pool.query(`SELECT * FROM employee;`);
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
    let query = "SELECT * FROM employee WHERE 1=1";
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
    let compensationPerYearMonth = new Map();
    for (let i = 0; i < Object.keys(compensations).length; i++) 
    {
        const stringDate = JSON.stringify(compensations[i].date)
        //String processing to achieve YYYY-mm notation
        const amount = compensations[i].amount;
        const dateArray = stringDate.split("-");
        const year = dateArray[0].replace('"', '');
        const month = dateArray[1];
        const yearMonth = year + "-" + month;

        console.log(yearMonth);

        if (compensationPerYearMonth.has(yearMonth))
        {
            let currentCompensation = compensationPerYearMonth.get(yearMonth);
            console.log(currentCompensation, amount);
            //Sum Calculation
            console.log(parseFloat(parseFloat(currentCompensation).toFixed(2)));
            console.log(parseFloat(parseFloat(amount).toFixed(2)));
            let sum = (parseFloat(currentCompensation) + 
                        parseFloat(amount)).toFixed(2);
            console.log(`sum ${sum}`);
            compensationPerYearMonth.set(yearMonth, sum);
        }
        else 
        {
            compensationPerYearMonth.set(yearMonth, parseFloat(amount).toFixed(2));
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
        const query = `SELECT date, amount, comp_id FROM compensation 
                       WHERE fk_employee = $1 
                       AND date BETWEEN $2 AND $3`;

        const results = await pool.query(query, values);

        //Summate the costs of each of these compensations per month to see total compensation each month
        const compensationPerYearMonth = calculateTotalCompensationPerMonth(results.rows);

        console.log(compensationPerYearMonth.entries());
        console.log(JSON.stringify(Object.fromEntries(compensationPerYearMonth)));
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
        console.log(employeeId, date);
        const dateSeparated = date.split('-');
        const year = dateSeparated[0];
        const month = dateSeparated[1];
        console.log(year, month);

        const values = [year, month, parseInt(employeeId)];
        const query = `SELECT * FROM compensation 
                    WHERE EXTRACT(YEAR FROM date) = $1 AND 
                    EXTRACT(MONTH FROM date) = $2 AND
                    fk_employee = $3;`

        const results = await pool.query(query, values);
        const monthCompensation = calculateCompensationForSingleMonth(results.rows);
        results.rows.push({ monthCompensation: monthCompensation});
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err)
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }   
}
    