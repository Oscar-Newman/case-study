import { NextRequest, NextResponse } from "next/server";

const pool = require('./db.js');

export async function getEmployeeById (id) {
    
    try {
        const value = [id];
        const query = `SELECT * FROM employee WHERE emp_id = $1;`
        const results = await pool.query(query, value);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404});
        }
        return NextResponse.json(results.rows[0], {status: 200});
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

export async function deleteEmployeeById (id) {
    
    try {
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
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

export async function updateEmployeeById (firstName, middleName, lastName, birthDate, position, id) 
{
    try {   
        const values = [firstName, middleName, lastName, birthDate, position, parseInt(id)]; 
        const query = `
            UPDATE employee
            SET firstname = $1, middlename = $2, lastname = $3, date = $4, position = $5 
            WHERE emp_id = $6;`;

        console.log("LINE BEFORE RESULTS");
        const results = await pool.query(query, values);
        console.log("LINE AFTER RESULTS");
        console.log(results);
        return NextResponse.json(results, {status: 200});   
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}


export async function addEmployeeToDatabase (firstName, middleName, lastName, birthDate, position) 
{
    console.log(firstName, middleName, lastName, birthDate, position);
    try {    
        if (!middleName || typeof middleName !== 'string') 
        {
            const values = [firstName, lastName, birthDate, position]; 
            console.log(firstName, lastName, birthDate, position);
            const query = `
                INSERT INTO employee (firstname, middlename, lastname, date, position) 
                VALUES ($1, NULL, $2, $3, $4) RETURNING emp_id;`;

            const results = await pool.query(query, values);
            console.log(results);
            return NextResponse.json(results, {status: 200});
        }
        else 
        {
            const values = [firstName, middleName, lastName, birthDate, position]; 
            console.log(firstName, lastName, birthDate, position);
            const query = `
                INSERT INTO employee (firstname, middlename, lastname, date, position) 
                VALUES ($1, $2, $3, $4, $5) RETURNING emp_id;`;
            
            const results = await pool.query(query, values);
            console.log(results);
            return NextResponse.json(results, {status: 200});
        }

        
        
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function getAllEmployees() 
{
    try {
        const results = await pool.query(`SELECT * FROM employee;`);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "No employees found"}), {status: 404};
        }
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function searchForEmployee (firstName, lastName, position) 
{
    const values = [];
    let query = "SELECT * FROM employee WHERE 1=1";
    let index = 1;
    try {
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
        
        console.log("QUERY BELOW");
        console.log(query);
        console.log(values);
        const results = await pool.query(query, values);
        return NextResponse.json(results.rows, {status: 200});
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

