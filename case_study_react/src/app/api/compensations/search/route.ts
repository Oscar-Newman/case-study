import { NextRequest } from "next/server";
import { searchForCompensations } from "../../../../../lib/dbRoutes";

// User Story 1.6
export async function GET(req: NextRequest) 
{
    // Get the search params of the view compensation history search
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const employeeId = url.searchParams.get("employeeId");

    return searchForCompensations(startDate, endDate, employeeId);
}