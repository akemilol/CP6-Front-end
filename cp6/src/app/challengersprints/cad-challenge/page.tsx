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

            const response = await fetch(`http://localhost:3000/api/base-challengersprints/`,{
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
                navigate.push("/challengersprints");
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
                    <h1> Cadastrar Challenge</h1>
                    <div>
                        <label htmlFor="idMateria">Materia do Challenge</label>
                        <input type="text" name="materia" id="idMateria" value={challenge.materia} onChange={(e)=> setChallenge({...challenge, materia:e.target.value})} placeholder="Qual a Matéria do Challenge?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNome">Nome do Challenge</label>
                        <input type="text" name="nome" id="idNome" value={challenge.nome} onChange={(e)=> setChallenge({...challenge, nome:e.target.value})} placeholder="Qual o Nome do Challenge?" required/>
                    </div>
                    <div>
                        <label htmlFor="idNota">Nota do Challenge</label>
                        <input type="number" name="nota" id="idNota" value={challenge.nota} onChange={(e)=> setChallenge({...challenge, nota: parseInt(e.target.value)})} placeholder="Qual a Nota do Challenge?" required/>
                    </div>
                    <div>
                        <label htmlFor="idAluno">Nome do Aluno</label>
                        <input type="text" name="aluno" id="idAluno" value={challenge.aluno} onChange={(e)=> setChallenge({...challenge, aluno:e.target.value})} placeholder="Qual o Aluno?" required/>
                    </div>
                    <div>
                        <label htmlFor="idDescricao">Descrição do Challenge</label>
                        <input type="text" name="descricao" id="idDescricao" value={challenge.descricao} onChange={(e)=> setChallenge({...challenge, descricao:e.target.value})} placeholder="Descreva o Challenge" required/>
                    </div>
                    <div>
                        <label htmlFor="idFeedback">Feedback da Checkpoint</label>
                        <input type="text" name="feedback" id="idFeedback" value={challenge.feedback} onChange={(e)=> setChallenge({...challenge, feedback:e.target.value})} placeholder="Qual foi o Feedback?" required/>
                    </div>
                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}