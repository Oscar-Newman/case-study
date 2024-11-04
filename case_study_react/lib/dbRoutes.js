const chalk = require('chalk');
var HttpStatus = require('http-status-codes');

const express = require('express');
const router = express.Router();

const pool = require('./db.js');

async function getEmployeeById (id) {
    
    try {
        const rows = await pool.query(`SELECT emp_id, firstname, middlename, lastname, date, position FROM employee WHERE emp_id = ${param}`);
        return response.status(200).json(rows);
    }
    catch (err) {
        return response.status(HttpStatus.NOT_FOUND).send(`No employee found with the id ${employeeId}`)
    }
};

export default getEmployeeById;

