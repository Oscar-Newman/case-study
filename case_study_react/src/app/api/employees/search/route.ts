import { NextRequest } from "next/server";
import {searchForEmployee} from "../../../../../lib/dbRoutes";

export async function GET(req: NextRequest) 
{
    // Get the search params of the employee search
    const url = new URL(req.url);
    const firstName = url.searchParams.get("firstName");
    const lastName = url.searchParams.get("lastName");
    const position = url.searchParams.get("position");

    return searchForEmployee(firstName, lastName, position);
}