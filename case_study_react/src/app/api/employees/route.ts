import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(req: NextRequest) {
    try {
        const results = await pool.query(`SELECT * FROM employee`);
        if (results.rows.length == 0) {
            return NextResponse.json({error : "No employees found"}, {status: 404})
        }
        return NextResponse.json(results.rows[0]);
    }
    catch (err) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
   
}
