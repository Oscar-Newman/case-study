import { NextRequest, NextResponse } from "next/server";
import { addCompensationToDatabase } from "../../../../../lib/dbRoutes";
import { ErrorFields } from "../../../../../lib/interface";

export async function POST(req: NextRequest) 
{
    try {
        const data = await req.formData();
        const compType = data.get('compType');
        const amount = data.get('amount');
        const description = data.get('description');
        const date = data.get('date');
        const employeeId = data.get('employeeId');    

        const errors : ErrorFields = {};
        console.log(compType, amount, description, data, employeeId);
        if (!compType || typeof compType !== 'string') {
            errors.compType = "Compensation Type is required and must be a string.";
        }
        if (!date || typeof date !== 'string') {
            errors.date = "Date (YYYY-MM) is required and must be a valid date.";
        }
        if (Object.keys(errors).length > 0) 
        {
            return NextResponse.json({error: "Bad Request"}, {status: 400});
        }
        
        return addCompensationToDatabase(compType, amount, description, date, employeeId);

    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "Issue occured"}, {status: 403})
    }
}