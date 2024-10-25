import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoint } from "@/types";

export async function GET() {
    const file = await fs.readFile(process.cwd() + "/src/data/base.json" , "utf-8");

    //PARSEAR O ARQUIVO
    const checkpoints = JSON.parse(file);
    return NextResponse.json(checkpoints);
}