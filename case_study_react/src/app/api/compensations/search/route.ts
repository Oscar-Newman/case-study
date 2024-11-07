import { NextRequest } from "next/server";
import { searchForCompensations } from "../../../../../lib/dbRoutes";

// Use the search params from REST API URL to search for compensations using search fields in UI
export async function GET(req: NextRequest) 
{
    // Gets API URL
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const employeeId = url.searchParams.get("employeeId");

    return searchForCompensations(startDate, endDate, employeeId);
}