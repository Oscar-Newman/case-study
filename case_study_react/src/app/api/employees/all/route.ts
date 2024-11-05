import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/db";
import { getAllEmployees } from "../../../../../lib/dbRoutes";

export async function GET(req: NextRequest) {

    return getAllEmployees();
}
