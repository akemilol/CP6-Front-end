"use client";

import { TipoChallenge } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadCallenge() {
    const navigate = useRouter();

    const [challenge, setChallenge] = useState<TipoChallenge>({
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

            const response = await fetch(`http://localhost:3000/api/base-challenge/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(challenge)
            });

            if(response.ok){
                alert("Challenge cadastrada com sucesso.");
                setChallenge({
                    id:0,
                    materia:"",
                    nome:"",
                    nota:0,
                    aluno:"",
                    descricao:"",
                    feedback:"",
                });
                navigate.push("/challenges");
            }
        } catch (error) {
            console.error("Falha no cadastramento de challenge: ", error);
            navigate.push("/error");
        }
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1> Cadastrar Checkpoint</h1>
                    <div>
                        <label htmlFor="idMateria">Materia da Checkpoint</label>
                        <input type="text" name="materia" id="idMateria" value={checkpoint.materia} onChange={(e)=> setCheckpoint({...checkpoint, materia:e.target.value})} placeholder="Qual a Matéria da Checkpoint?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNome">Nome da Checkpoint</label>
                        <input type="text" name="nome" id="idNome" value={checkpoint.nome} onChange={(e)=> setCheckpoint({...checkpoint, nome:e.target.value})} placeholder="Qual o Nome da Checkpoint?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNota">Nota da Checkpoint</label>
                        <input type="number" name="nota" id="idNota" value={checkpoint.nota} onChange={(e)=> setCheckpoint({...checkpoint, nota: parseInt(e.target.value)})} placeholder="Qual a Nota da Checkpoint?" required/>
                    </div>
                    <div>
                        <label htmlFor="idAluno">Nome do Aluno</label>
                        <input type="text" name="aluno" id="idAluno" value={checkpoint.aluno} onChange={(e)=> setCheckpoint({...checkpoint, aluno:e.target.value})} placeholder="Qual o Aluno?" required/>
                    </div>
                    <div>
                        <label htmlFor="idDescricao">Descrição da Checkpoint</label>
                        <input type="text" name="descricao" id="idDescricao" value={checkpoint.descricao} onChange={(e)=> setCheckpoint({...checkpoint, descricao:e.target.value})} placeholder="Descreva a Checkpoint" required/>
                    </div>
                    <div>
                        <label htmlFor="idFeedback">Feedback da Checkpoint</label>
                        <input type="text" name="feedback" id="idFeedback" value={checkpoint.feedback} onChange={(e)=> setCheckpoint({...checkpoint, feedback:e.target.value})} placeholder="Qual foi o Feedback?" required/>
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}