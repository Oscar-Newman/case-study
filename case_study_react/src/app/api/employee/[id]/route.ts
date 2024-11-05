import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/db";
import {deleteEmployeeById, getEmployeeById} from "../../../../../lib/dbRoutes";


export async function GET(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return getEmployeeById(id);
}

export async function DELETE(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return deleteEmployeeById(id);
}

export async function PUT(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    try {
        const data = await req.formData();
        const firstname = data.get('firstName');
        //const middlename = data.get('middleName');
        //const lastname = data.get('lastName');
        //const birthdate = data.get('birthDate');
        //const position = data.get('position');    

        console.log(firstname);
    }
    catch (err) {
        console.error(err);
    }





    return NextResponse.json({"temp": "not implemented yet"});
}

