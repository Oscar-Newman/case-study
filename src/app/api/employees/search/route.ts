import { NextRequest } from "next/server";
import {searchForEmployee} from "../../../../../lib/dbRoutes";

// Use the search params from the URL to find Employee object in the database
export async function GET(req: NextRequest) 
{
    const url = new URL(req.url);
    const firstName = url.searchParams.get("firstName");
    const lastName = url.searchParams.get("lastName");
    const position = url.searchParams.get("position");

    return searchForEmployee(firstName, lastName, position);
}