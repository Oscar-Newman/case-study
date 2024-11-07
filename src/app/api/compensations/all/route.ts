import { NextRequest } from "next/server";
import { getAllCompensations } from "../../../../../lib/dbRoutes";

export async function GET(req: NextRequest) {

    return getAllCompensations();
}
