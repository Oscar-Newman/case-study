//Search using employee ID and start month/year and end month/year
//Format needs to be YYYY-MM if possible
//SEARCH employee and BETWEEN start-end dates, no breakdown just total for the month

//SEARCH employee and FOR a specific date, SHOW breakdown

import { NextRequest } from "next/server";
import { searchForCompensations } from "../../../../../lib/dbRoutes";

export async function GET(req: NextRequest) 
{
    // Get the search params of the compensation search to view compensation history
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const employeeId = url.searchParams.get("employeeId");

    return searchForCompensations(startDate, endDate, employeeId);
}

