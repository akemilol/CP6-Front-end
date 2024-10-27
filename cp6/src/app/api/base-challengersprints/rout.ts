import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallenge } from "@/types";

export async function GET() {
    const file = await fs.readFile(process.cwd() + "/src/data/baseChallenge.json" , "utf-8");

    const challenges = JSON.parse(file);
    return NextResponse.json(challenges);
}

export async function POST(request:Request) {
    try{
        const file = await fs.readFile(process.cwd() + "/src/data/baseChallenge.json" , "utf-8");

        const challenges:TipoChallenge[] = JSON.parse(file);

        const {id ,materia ,nome ,nota ,aluno ,descricao ,feedback} = await request.json();

        const novoChallenge:TipoChallenge = {
            id: id,
            materia: materia,
            nome: nome,
            nota: nota,
            aluno: aluno,
            descricao: descricao,
            feedback: feedback
            };

            novoChallenge.id = (challenges [challenges.length - 1].id +1)

            challenges.push(novoChallenge);

            const fileJSON = JSON.stringify(challenges)

            await fs.writeFile(process.cwd() + "/src/data/baseChallenge.json" , fileJSON);

            return NextResponse.json(novoChallenge,{status:201});
    }catch(error){
        return NextResponse.json({error:"Falha na gravação: "+error},{status:500});
    }
}

