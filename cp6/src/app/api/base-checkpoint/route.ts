import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCheckpoint } from "@/types";

export async function GET() {
    const file = await fs.readFile(process.cwd() + "/src/data/baseCheckpoint.json" , "utf-8");

    const checkpoints = JSON.parse(file);
    return NextResponse.json(checkpoints);
}

export async function POST(request:Request) {
    try{
        const file = await fs.readFile(process.cwd() + "/src/data/baseCheckpoint.json" , "utf-8");

        const checkpoints:TipoCheckpoint[] = JSON.parse(file);

        const {id ,materia ,nome ,nota ,aluno ,descricao ,feedback} = await request.json();

        const novoCheckpoint:TipoCheckpoint = {
            id: id,
            materia: materia,
            nome: nome,
            nota: nota,
            aluno: aluno,
            descricao: descricao,
            feedback: feedback
            };

            novoCheckpoint.id = (checkpoints [checkpoints.length - 1].id +1)

            checkpoints.push(novoCheckpoint);

            const fileJSON = JSON.stringify(checkpoints)

            await fs.writeFile(process.cwd() + "/src/data/baseCheckpoint.json" , fileJSON);

            return NextResponse.json(novoCheckpoint,{status:201});
    }catch(error){
        return NextResponse.json({error:"Falha na gravação: "+error},{status:500});
    }
}

