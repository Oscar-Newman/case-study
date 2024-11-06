import { NextRequest, NextResponse } from "next/server";
import {ErrorFields} from "../../../../../../lib/interface";
import {getCompensationById, deleteCompensationById, updateCompensationById} from "../../../../../../lib/dbRoutes";


export async function GET(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return getCompensationById(id);
}

export async function DELETE(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    return deleteCompensationById(id);
}

export async function PUT(req: NextRequest, { params }: {params: Promise<{id: string}>}) 
{
    const { id } = await params;
    console.log(`${id}`);

    try {
        const data = await req.formData();
        const description = data.get('description');
        const amount = data.get('amount');    

        const errors : ErrorFields = {};

        if (!amount) {
            errors.firstName = "Amount is required and must be a string.";
        }
        if (Object.keys(errors).length > 0) 
        {
            return NextResponse.json({error: "Bad Request"}, {status: 400});
        }  

        return updateCompensationById(amount, description, id);
        
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 403})
    }
}

