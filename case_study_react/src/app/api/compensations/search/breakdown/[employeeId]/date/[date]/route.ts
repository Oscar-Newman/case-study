import { NextRequest } from "next/server";
import { getCompensationsByEmployeeIdAndDate } from "../../../../../../../../../lib/dbRoutes";

// User Story 1.7
type Params = 
{
    employeeId: Promise<{employeeId: string}>;
    date: Promise<{date: string}>;
}

export async function GET(req: NextRequest, { params }: {params: Params}) 
{
    // Use search params to get detailed breakdown of compensation
    const { employeeId, date} = await params;

    return getCompensationsByEmployeeIdAndDate(employeeId, date);
}
