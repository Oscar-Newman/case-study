import { NextRequest, NextResponse } from "next/server";
import {ErrorFields} from "../../../../../../lib/interface";
import {deleteEmployeeById, getEmployeeById, updateEmployeeById} from "../../../../../../lib/dbRoutes";

// GET Employee object by ID
export async function GET(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return getEmployeeById(id);
}

// DELETE Employee object by ID
export async function DELETE(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return deleteEmployeeById(id);
}

// UPDATE Employee object by ID using data from UI form
export async function PUT(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

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

        return updateEmployeeById(firstname, middlename, lastname, birthdate, position, id);
        
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 403})
    }
}

