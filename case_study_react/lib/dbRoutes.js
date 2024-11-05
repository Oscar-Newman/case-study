import { NextRequest, NextResponse } from "next/server";

const pool = require('./db.js');

export async function getEmployeeById (id) {
    
    try {
        const results = await pool.query(`SELECT emp_id, firstname, middlename, lastname, date, position FROM employee WHERE emp_id = ${[id]};`);
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
        const searchResult = await pool.query(`SELECT * FROM employee WHERE emp_id = ${[id]};`);
        if (searchResult.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404});
        }
        else 
        {
           const results = await pool.query(`DELETE FROM employee WHERE emp_id = ${[id]};`);
           return NextResponse.json(results.rows, {status: 200});
        }     
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
};

export async function updateEmployeeById (firstName, middleName, lastName, birthDate, position) 
{
    try {   
        const values = [firstName, middleName, lastName, birthDate, position]; 
        if (!middleName || typeof middleName !== 'string') 
        {
            values.splice(1, 1);
            console.log(firstName, lastName, birthDate, position);
            const query = `
                INS employee (firstname, lastname, date, position) 
                VALUES ($1, $2, $3, $4) RETURNING emp_id;`;

            const results = await pool.query(query, values);
            console.log(results);
            return NextResponse.json(results, {status: 200});
        }
        else 
        {
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


export async function addEmployeeToDatabase (firstName, middleName, lastName, birthDate, position) 
{
    console.log(firstName, middleName, lastName, birthDate, position);
    console.log(typeof middleName);

    try {   
        const values = [firstName, middleName, lastName, birthDate, position]; 
        if (!middleName || typeof middleName !== 'string') 
        {
            values.splice(1, 1);
            console.log(firstName, lastName, birthDate, position);
            const query = `
                INSERT INTO employee (firstname, lastname, date, position) 
                VALUES ($1, $2, $3, $4) RETURNING emp_id;`;

            const results = await pool.query(query, values);
            console.log(results);
            return NextResponse.json(results, {status: 200});
        }
        else 
        {
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
        return NextResponse.json(results.rows);
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}



