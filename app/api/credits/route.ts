import { NextResponse } from "next/server";
import { getCreditsServer } from "@/actions/getCredits";

const ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": ORIGIN,
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}

export async function GET() {
    try {
        const credits = await getCreditsServer();
        return NextResponse.json({ credits }, {
            headers: {
                "Access-Control-Allow-Origin": ORIGIN,
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    } catch (err) {
        return NextResponse.json({ credits: null }, {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": ORIGIN,
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }
}
