"use client";

import { TipoChallenge } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarChallenge({params}:{params:{id:number}}) {
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

    useEffect(() => {
        const chamadaApi = async () =>{
            const response = await fetch(`http://localhost:3000/api/base-challengersprints/${params.id}`);
            const dados = await response.json();
            setChallenge(dados);
        }

        chamadaApi();

    }, [])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{

            const response = await fetch(`http://localhost:3000/api/base-challengersprints/${params.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(challenge)
            });

            if(response.ok){
                alert("Challenge atualizado com sucesso.");
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
            console.error("Falha na atualização da challenge: ", error);
            navigate.push("/error");
        }
    }

    return(
        <div>
            <h1> Editar Challenge</h1>
            <div>
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
            </div>
            <div>
                <p> Materia     - {challenge.materia}</p>
                <p> Nome        - {challenge.nome}</p>
                <p> Nota        - {challenge.nota}</p>
                <p> Aluno       - {challenge.aluno}</p>
            </div>
        </div>
    )
}