"use client";

import { TipoGlobal } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadGlobalSolution() {
    const navigate = useRouter();

    const [global, setGlobal] = useState<TipoGlobal>({
        id:0,
        materia:"",
        nome:"",
        nota:0,
        aluno:"",
        descricao:"",
        feedback:"",
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{

            const response = await fetch(`http://localhost:3000/api/base-globalsolution/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(global)
            });

            if(response.ok){
                alert("Global Solution cadastrada com sucesso.");
                setGlobal({
                    id:0,
                    materia:"",
                    nome:"",
                    nota:0,
                    aluno:"",
                    descricao:"",
                    feedback:"",
                });
                navigate.push("/globalsolution");
            }
        } catch (error) {
            console.error("Falha no cadastramento de global: ", error);
            navigate.push("/error");
        }
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1> Cadastrar Global Solution</h1>
                    <div>
                        <label htmlFor="idMateria">Materia da Global Solution</label>
                        <input type="text" name="materia" id="idMateria" value={global.materia} onChange={(e)=> setGlobal({...global, materia:e.target.value})} placeholder="Qual a Matéria da Global Solution?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNome">Nome da Global Solution</label>
                        <input type="text" name="nome" id="idNome" value={global.nome} onChange={(e)=> setGlobal({...global, nome:e.target.value})} placeholder="Qual o Nome da Global Solution?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNota">Nota da Global Solution</label>
                        <input type="number" name="nota" id="idNota" value={global.nota} onChange={(e)=> setGlobal({...global, nota: parseInt(e.target.value)})} placeholder="Qual a Nota da Global Solution?" required/>
                    </div>
                    <div>
                        <label htmlFor="idAluno">Nome do Aluno</label>
                        <input type="text" name="aluno" id="idAluno" value={global.aluno} onChange={(e)=> setGlobal({...global, aluno:e.target.value})} placeholder="Qual o Aluno?" required/>
                    </div>
                    <div>
                        <label htmlFor="idDescricao">Descrição da Global Solution</label>
                        <input type="text" name="descricao" id="idDescricao" value={global.descricao} onChange={(e)=> setGlobal({...global, descricao:e.target.value})} placeholder="Descreva a Global Solution" required/>
                    </div>
                    <div>
                        <label htmlFor="idFeedback">Feedback da Global Solution</label>
                        <input type="text" name="feedback" id="idFeedback" value={global.feedback} onChange={(e)=> setGlobal({...global, feedback:e.target.value})} placeholder="Qual foi o Feedback?" required/>
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
