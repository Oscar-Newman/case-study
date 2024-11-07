import { NextRequest, NextResponse } from "next/server";
import { addCompensationToDatabase } from "../../../../../lib/dbRoutes";
import { ErrorFields } from "../../../../../lib/interface";

// Creating new Compensation object
export async function POST(req: NextRequest) 
{
    try {
        // Get the POST form data using the field names
        const data = await req.formData();
        const compType = data.get('compType');
        const amount = data.get('amount');
        const description = data.get('description');
        const date = data.get('date');
        const employeeId = data.get('employeeId');    

        // Check types of data collected and add any incorrect fields to Error Fields object
        const errors : ErrorFields = {};
        console.log(compType, amount, description, data, employeeId);
        if (!compType || typeof compType !== 'string') {
            errors.compType = "Compensation Type is required and must be a string.";
        }
        if (!date || typeof date !== 'string') {
            errors.date = "Date (YYYY-MM) is required and must be a valid date.";
        }
        // Return bad request if any incorrect fields were filled out
        if (Object.keys(errors).length > 0) 
        {
            return NextResponse.json({error: "Bad Request"}, {status: 400});
        }
        // Call database function
        return addCompensationToDatabase(compType, amount, description, date, employeeId);

    }
    catch (err) {
        // Endpoint API error
        console.error(err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 403})
    }
}