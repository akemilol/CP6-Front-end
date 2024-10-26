"use client"
import { TipoCheckpoint } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Checkpoints() {

    const [checkpoint, setCheckpoint] = useState<TipoCheckpoint[]>([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState<string>("Todos");

    useEffect(() => {
        const chamadaApi = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/base-checkpoint');
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados da API");
                }
                const dados = await response.json();
                setCheckpoint(dados);
            } catch (error) {
                console.error("Erro na chamada da API: ", error);
            }
        }

        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("A checkpoint foi excluída com sucesso!");
                setCheckpoint((prev) => prev.filter((p) => p.id !== id));
            } else {
                throw new Error("Erro: " + response.statusText);
            }
        } catch (error) {
            console.error("Falha na exclusão: ", error);
        }
    };

    const handleAlunoChange = (aluno: string) => {
        setAlunoSelecionado(aluno);
    };

    const checkpointsFiltrados = alunoSelecionado === "Todos" 
        ? checkpoint 
        : checkpoint.filter((p) => p.aluno === alunoSelecionado);

    return (
        <div>
            <h1>Checkpoints</h1>
            <p>Descrição de Checkpoints Aqui.</p>

            <div>
                <button onClick={() => handleAlunoChange("Todos")}>Todos</button>
                <button onClick={() => handleAlunoChange("Valéria")}>Valéria</button>
                <button onClick={() => handleAlunoChange("Eduardo")}>Eduardo</button>
                <button onClick={() => handleAlunoChange("Mirela")}>Mirela</button>
            </div>

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
                        {checkpointsFiltrados.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.materia}</td>
                                <td>{p.nome}</td>
                                <td>{p.nota}</td>
                                <td>{p.aluno}</td>
                                <td>{p.descricao}</td>
                                <td>{p.feedback}</td>
                                <td>
                                    <Link href={`/checkpoints/checkpoint/${p.id}`}> EDITAR </Link> | 
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}> EXCLUIR </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
