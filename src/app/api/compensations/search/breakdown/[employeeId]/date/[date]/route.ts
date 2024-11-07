import { NextRequest } from "next/server";
import { getCompensationsByEmployeeIdAndDate } from "../../../../../../../../../lib/dbRoutes";

// Params object to take in multiple parameters from REST API URL
type Params = 
{
    employeeId: Promise<{employeeId: string}>;
    date: Promise<{date: string}>;
}

export async function GET(req: NextRequest, { params }: {params: Params}) 
{
    // Use inputs in Rest API URL to get detailed breakdown of compensation
    const { employeeId, date} = await params;

    return getCompensationsByEmployeeIdAndDate(employeeId, date);
}
