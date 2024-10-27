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
            const response = await fetch(`http://localhost:3000/api/base-challenge/${params.id}`);
            const dados = await response.json();
            setChallenge(dados);
        }

        chamadaApi();

    }, [])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{

            const response = await fetch(`http://localhost:3000/api/base-challenge/${params.id}`,{
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
                navigate.push("/challenges");
            }
        } catch (error) {
            console.error("Falha na atualização da checkpoint: ", error);
            navigate.push("/error");
        }
    }

    return(
        <div>
            <h1> Editar Checkpoints</h1>
            <div>
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
            </div>
            <div>
                <p> Materia     - {checkpoint.materia}</p>
                <p> Nome        - {checkpoint.nome}</p>
                <p> Nota        - {checkpoint.nota}</p>
                <p> Aluno       - {checkpoint.aluno}</p>
            </div>
        </div>
    )
}