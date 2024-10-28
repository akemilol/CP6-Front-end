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
        <div className="min-h-screen bg-blue-950 p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-6">Checkpoints</h1>
            <p className="text-center text-lg text-gray-300 mb-8">Checkpoints Ou CP são as provas semestrais aplicadas pelos professores. São aplicadas 3 provas por semestre.</p>

            <div className="flex justify-center gap-4 mb-8">
                <button 
                    onClick={() => handleAlunoChange("Todos")}
                    className={`px-4 py-2 font-semibold rounded-md text-white ${alunoSelecionado === 'Todos' ? 'bg-cyan-500' : 'bg-cyan-700 hover:bg-cyan-600'}`}>
                    Todos
                </button>
                <button 
                    onClick={() => handleAlunoChange("Valéria")}
                    className={`px-4 py-2 font-semibold rounded-md text-white ${alunoSelecionado === 'Valéria' ? 'bg-teal-500' : 'bg-teal-700 hover:bg-teal-600'}`}>
                    Valéria
                </button>
                <button 
                    onClick={() => handleAlunoChange("Eduardo")}
                    className={`px-4 py-2 font-semibold rounded-md text-white ${alunoSelecionado === 'Eduardo' ? 'bg-indigo-500' : 'bg-indigo-700 hover:bg-indigo-600'}`}>
                    Eduardo
                </button>
                <button 
                    onClick={() => handleAlunoChange("Mirela")}
                    className={`px-4 py-2 font-semibold rounded-md text-white ${alunoSelecionado === 'Mirela' ? 'bg-purple-500' : 'bg-purple-700 hover:bg-purple-600'}`}>
                    Mirela
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-blue-900 text-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">MATERIA</th>
                            <th className="py-3 px-6 text-left">NOME</th>
                            <th className="py-3 px-6 text-left">NOTA</th>
                            <th className="py-3 px-6 text-left">ALUNO</th>
                            <th className="py-3 px-6 text-left">DESCRIÇÃO</th>
                            <th className="py-3 px-6 text-left">FEEDBACK</th>
                            <th className="py-3 px-6 text-left">
                                <Link href={"/checkpoints/cad-checkpoint"} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">CADASTRAR</Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkpointsFiltrados.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-blue-800">
                                <td className="py-3 px-6">{p.id}</td>
                                <td className="py-3 px-6">{p.materia}</td>
                                <td className="py-3 px-6">{p.nome}</td>
                                <td className="py-3 px-6">{p.nota}</td>
                                <td className="py-3 px-6 text-cyan-400 font-bold">{p.aluno}</td>
                                <td className="py-3 px-6">{p.descricao}</td>
                                <td className="py-3 px-6">{p.feedback}</td>
                                <td className="py-3 px-6">
                                    <Link href={`/checkpoints/checkpoint/${p.id}`} className="text-cyan-400 hover:underline mr-2">EDITAR</Link> | 
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}
                                        className="text-red-500 hover:underline ml-2">
                                        EXCLUIR
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
