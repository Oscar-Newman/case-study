import { NextRequest, NextResponse } from "next/server";
import { getAllEmployees } from "../../../../../lib/dbRoutes";

// GET all Employee objects from the database
export async function GET(req: NextRequest) {

    return getAllEmployees();
}
