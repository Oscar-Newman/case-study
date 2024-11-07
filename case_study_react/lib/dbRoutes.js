import { NextResponse } from "next/server";

const pool = require('./db.js');

export async function getEmployeeById (id) {
    
    try 
    {
        const value = [id];
        const query = `SELECT * FROM employee WHERE emp_id = $1;`
        const results = await pool.query(query, value);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404});
        }
        return NextResponse.json(results.rows[0], {status: 200});
    }
    catch (err) 
    {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

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

export function calculateCompensationForSingleMonth(compensations) 
{
    let sumCompensation = 0;
    console.log(Object.keys(compensations).length);
    for (let i = 0; i < Object.keys(compensations).length; i++) 
    {   
        const amount = parseFloat(compensations[i].amount);
        console.log(`amount ${amount}`);
        //console.log(`amount ${parseFloat(amount)} ${typeof parseFloat(amount)}`);
        sumCompensation += amount;
    }
    //console.log(sumCompensation.toFixed(2));
    return sumCompensation.toFixed(2);

}

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
    