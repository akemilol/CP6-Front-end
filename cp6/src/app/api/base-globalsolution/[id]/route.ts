import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobal } from "@/types";

export async function GET(request:Request, {params}:{params:{id:number}}) {
    const file = await fs.readFile(process.cwd() + "/src/data/baseGlobal.json" , "utf-8");
    const globals:TipoGlobal[] = JSON.parse(file);
    const global = globals.find( p => p.id == params.id);
    return NextResponse.json(global);
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {

    try{
        const file = await fs.readFile(process.cwd() + "/src/data/baseGlobal.json" , "utf-8");

        const globals:TipoGlobal[] = JSON.parse(file)

        const {materia, nome, nota, aluno, descricao, feedback} = await request.json();

        const indice = globals.findIndex(p => p.id == params.id);

        if(indice != -1){
            const global:TipoGlobal = {
                id: parseInt(params.id.toString()),
                materia:materia,
                nome:nome,
                nota:nota,
                aluno:aluno,
                descricao:descricao,
                feedback:feedback
            }

            globals.splice(indice, 1, global);

            const fileJson = JSON.stringify(globals);

            await fs.writeFile(process.cwd() + "/src/data/baseGlobal.json" , fileJson);

            return NextResponse.json({msg:"Global alterada com sucesso!"});
        }
    }catch(error){
        return NextResponse.json({error:"Falha na atualização da Global: " + error},{status:500});
    }

}

export async function DELETE(request:Request, {params}:{params:{id:number}}) {
    try {
        const file = await fs.readFile(process.cwd() + "/src/data/baseGlobal.json" , "utf-8");

        const globals:TipoGlobal[] = JSON.parse(file);

        const indice = globals.findIndex( p => p.id == params.id);

        if(indice != -1){
            globals.splice(indice, 1);

            const fileJson = JSON.stringify(globals);

            await fs.writeFile(process.cwd() + "/src/data/baseGlobal.json" , fileJson);

            return NextResponse.json({msg:"Global excluída com sucesso."});
        }
    }catch(error){
        return NextResponse.json({error:"Falha na exclusão do produto: " + error},{status:500});
    }
}