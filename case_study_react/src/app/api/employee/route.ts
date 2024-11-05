//POST
//PUT


import { NextRequest, NextResponse } from "next/server";
import { addEmployeeToDatabase } from "../../../../lib/dbRoutes";

interface ErrorFields 
{
    [key: string]: string;
}

export async function POST(req: NextRequest) 
{
    try {
        const data = await req.formData();
        const firstname = data.get('firstName');
        const middlename = data.get('middleName');
        const lastname = data.get('lastName');
        const birthdate = data.get('birthDate');
        const position = data.get('position');    

        const errors : ErrorFields = {};

        if (!firstname || typeof firstname !== 'string') {
            errors.firstName = "First Name is required and must be a string.";
        }
        if (!lastname || typeof lastname !== 'string') {
            errors.lastName = "Last Name is required and must be a string.";
        }
        if (!birthdate || typeof birthdate !== 'string') {
            errors.birthdate = "Birth Date is required and must be a date.";
        }
        if (!position || typeof position !== 'string') {
            errors.position = "Position is required and must be a string.";
        }
        if (Object.keys(errors).length > 0) 
        {
            return NextResponse.json({error: "Bad Request"}, {status: 400});
        }
        
        return addEmployeeToDatabase(firstname, middlename, lastname, birthdate, position);

    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "Issue occured"}, {status: 403})
    }
}