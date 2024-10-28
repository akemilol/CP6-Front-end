"use client";

import { TipoGlobal } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadGlobalSolution() {
    const navigate = useRouter();

    const [global, setGlobal] = useState<TipoGlobal>({
        id: 0,
        materia: "",
        nome: "",
        nota: 0,
        aluno: "",
        descricao: "",
        feedback: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/base-globalsolution/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(global),
            });

            if (response.ok) {
                alert("Global Solution cadastrada com sucesso.");
                setGlobal({
                    id: 0,
                    materia: "",
                    nome: "",
                    nota: 0,
                    aluno: "",
                    descricao: "",
                    feedback: "",
                });
                navigate.push("/globalsolution");
            }
        } catch (error) {
            console.error("Falha no cadastramento de Global Solution: ", error);
            navigate.push("/error");
        }
    };

    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center p-8">
            <div className="p-8 rounded-lg shadow-md w-full max-w-lg bg-blue-900 -mt-1">
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Cadastrar Global Solution</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="idMateria" className="block text-gray-300 font-semibold mb-2">Matéria da Global Solution</label>
                        <input
                            type="text"
                            name="materia"
                            id="idMateria"
                            value={global.materia}
                            onChange={(e) => setGlobal({ ...global, materia: e.target.value })}
                            placeholder="Qual a Matéria da Global Solution?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idNome" className="block text-gray-300 font-semibold mb-2">Nome da Global Solution</label>
                        <input
                            type="text"
                            name="nome"
                            id="idNome"
                            value={global.nome}
                            onChange={(e) => setGlobal({ ...global, nome: e.target.value })}
                            placeholder="Qual o Nome da Global Solution?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idNota" className="block text-gray-300 font-semibold mb-2">Nota da Global Solution</label>
                        <input
                            type="number"
                            name="nota"
                            id="idNota"
                            value={global.nota}
                            onChange={(e) => setGlobal({ ...global, nota: parseInt(e.target.value) })}
                            placeholder="Qual a Nota da Global Solution?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idAluno" className="block text-gray-300 font-semibold mb-2">Nome do Aluno</label>
                        <input
                            type="text"
                            name="aluno"
                            id="idAluno"
                            value={global.aluno}
                            onChange={(e) => setGlobal({ ...global, aluno: e.target.value })}
                            placeholder="Qual o Aluno?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idDescricao" className="block text-gray-300 font-semibold mb-2">Descrição da Global Solution</label>
                        <input
                            type="text"
                            name="descricao"
                            id="idDescricao"
                            value={global.descricao}
                            onChange={(e) => setGlobal({ ...global, descricao: e.target.value })}
                            placeholder="Descreva a Global Solution"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idFeedback" className="block text-gray-300 font-semibold mb-2">Feedback da Global Solution</label>
                        <input
                            type="text"
                            name="feedback"
                            id="idFeedback"
                            value={global.feedback}
                            onChange={(e) => setGlobal({ ...global, feedback: e.target.value })}
                            placeholder="Qual foi o Feedback?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
