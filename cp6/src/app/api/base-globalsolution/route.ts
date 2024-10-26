import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobal } from "@/types";

export async function GET() {
    const file = await fs.readFile(process.cwd() + "/src/data/baseGlobal.json" , "utf-8");

    const globals = JSON.parse(file);
    return NextResponse.json(globals);
}

export async function POST(request:Request) {
    try{
        const file = await fs.readFile(process.cwd() + "/src/data/baseGlobal.json" , "utf-8");

        const globals:TipoGlobal[] = JSON.parse(file);

        const {id ,materia ,nome ,nota ,aluno ,descricao ,feedback} = await request.json();

        const novoGlobal:TipoGlobal = {
            id: id,
            materia: materia,
            nome: nome,
            nota: nota,
            aluno: aluno,
            descricao: descricao,
            feedback: feedback
            };

            novoGlobal.id = (globals [globals.length - 1].id +1)

            globals.push(novoGlobal);

            const fileJSON = JSON.stringify(globals)

            await fs.writeFile(process.cwd() + "/src/data/baseGlobal.json" , fileJSON);

            return NextResponse.json(novoGlobal,{status:201});
    }catch(error){
        return NextResponse.json({error:"Falha na gravação: "+error},{status:500});
    }
}

