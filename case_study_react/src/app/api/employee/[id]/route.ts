import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/db";

export async function GET(req: NextRequest, { params }: {params: Promise<{id: string}>}) {
    const { id } = await params;
    console.log(`${id}`);
    
    try {
        const results = await pool.query(`SELECT emp_id, firstname, middlename, lastname, date, position FROM employee WHERE emp_id = ${[id]}`);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "Employee not found"}, {status: 404})
        }
        return NextResponse.json(results.rows[0]);
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
   
}
