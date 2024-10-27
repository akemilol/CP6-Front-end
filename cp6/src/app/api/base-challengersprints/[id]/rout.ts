import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoChallenge } from "@/types";

export async function GET(request:Request, {params}:{params:{id:number}}) {
    const file = await fs.readFile(process.cwd() + "/src/data/baseChallenge.json" , "utf-8");
    const challenges:TipoChallenge[] = JSON.parse(file);
    const challenge = challenge.find( p => p.id == params.id);
    return NextResponse.json(challenge);
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {

    try{
        const file = await fs.readFile(process.cwd() + "/src/data/baseChallenge.json" , "utf-8");

        const challenges:TipoChallenge[] = JSON.parse(file)

        const {materia, nome, nota, aluno, descricao, feedback} = await request.json();

        const indice = challenges.findIndex(p => p.id == params.id);

        if(indice != -1){
            const challenge:TipoChallenge = {
                id: parseInt(params.id.toString()),
                materia:materia,
                nome:nome,
                nota:nota,
                aluno:aluno,
                descricao:descricao,
                feedback:feedback
            }

            challenges.splice(indice, 1, challenge);

            const fileJson = JSON.stringify(challenges);

            await fs.writeFile(process.cwd() + "/src/data/baseCheckpoint.json" , fileJson);

            return NextResponse.json({msg:"Checkpoint alterada com sucesso!"});
        }
    }catch(error){
        return NextResponse.json({error:"Falha na atualização da Checkpoint: " + error},{status:500});
    }

}

export async function DELETE(request:Request, {params}:{params:{id:number}}) {
    try {
        const file = await fs.readFile(process.cwd() + "/src/data/baseCheckpoint.json" , "utf-8");

        const checkpoints:TipoCheckpoint[] = JSON.parse(file);

        const indice = checkpoints.findIndex( p => p.id == params.id);

        if(indice != -1){
            checkpoints.splice(indice, 1);

            const fileJson = JSON.stringify(checkpoints);

            await fs.writeFile(process.cwd() + "/src/data/baseCheckpoint.json" , fileJson);

            return NextResponse.json({msg:"Checkpoint excluída com sucesso."});
        }
    }catch(error){
        return NextResponse.json({error:"Falha na exclusão do produto: " + error},{status:500});
    }
}