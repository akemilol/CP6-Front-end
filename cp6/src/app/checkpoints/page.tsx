"use client"
import { TipoCheckpoint } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Checkpoints() {

    const [checkpoint, setCheckpoint] = useState<TipoCheckpoint[]>([]);

    useEffect(() => {
        const chamadaApi = async () =>{
            const response = await fetch('http://localhost:3000/api/base-checkpoint');
            const dados = await response.json();
            setCheckpoint(dados);
        }

        chamadaApi();

    }, [])

    const handleDelete = async (id:number)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("A checkpoint foi excluída com sucesso!");
                window.location.reload();
            }
            throw new Error("Erro: " + response);
        } catch (error) {
            console.error("Falha na exclusão: ",error);
        }
    }

    return(
        <div>
            <h2>Checkpoints</h2>
            <div>
                <table className="tabelaCP">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>MATERIA</th>
                            <th>NOME</th>
                            <th>NOTA</th>
                            <th>ALUNO</th>
                            <th>DESCRIÇÃO</th>
                            <th>FEEDBACK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkpoint.map((p) => (
                            <tr key={p.id}>
                                <td>{p.materia}</td>
                                <td>{p.nome}</td>
                                <td>{p.nota}</td>
                                <td>{p.aluno}</td>
                                <td>{p.descricao}</td>
                                <td>{p.feedback}</td>
                                <td> <Link href={`/checkpoints/checkpoint/${p.id}`}> EDITAR </Link> | <Link  href="#" onClick={()=> handleDelete(p.id)}> EXCLUIR </Link> </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
        </div>

    )
}