"use client";

import { TipoChallenge } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadChallenge() {
    const navigate = useRouter();

    const [challenge, setChallenge] = useState<TipoChallenge>({
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
            const response = await fetch(`http://localhost:3000/api/base-challengersprints/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(challenge),
            });

            if (response.ok) {
                alert("Challenge cadastrada com sucesso.");
                setChallenge({
                    id: 0,
                    materia: "",
                    nome: "",
                    nota: 0,
                    aluno: "",
                    descricao: "",
                    feedback: "",
                });
                navigate.push("/challengersprints");
            }
        } catch (error) {
            console.error("Falha no cadastramento de challenge: ", error);
            navigate.push("/error");
        }
    };

    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center p-8">
            <div className="p-8 rounded-lg shadow-md w-full max-w-lg bg-blue-900 -mt-1">
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Cadastrar Challenge</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="idMateria" className="block text-gray-300 font-semibold mb-2">Matéria do Challenge</label>
                        <input
                            type="text"
                            name="materia"
                            id="idMateria"
                            value={challenge.materia}
                            onChange={(e) => setChallenge({ ...challenge, materia: e.target.value })}
                            placeholder="Qual a Matéria do Challenge?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idNome" className="block text-gray-300 font-semibold mb-2">Nome do Challenge</label>
                        <input
                            type="text"
                            name="nome"
                            id="idNome"
                            value={challenge.nome}
                            onChange={(e) => setChallenge({ ...challenge, nome: e.target.value })}
                            placeholder="Qual o Nome do Challenge?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idNota" className="block text-gray-300 font-semibold mb-2">Nota do Challenge</label>
                        <input
                            type="number"
                            name="nota"
                            id="idNota"
                            value={challenge.nota}
                            onChange={(e) => setChallenge({ ...challenge, nota: parseInt(e.target.value) })}
                            placeholder="Qual a Nota do Challenge?"
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
                            value={challenge.aluno}
                            onChange={(e) => setChallenge({ ...challenge, aluno: e.target.value })}
                            placeholder="Qual o Aluno?"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idDescricao" className="block text-gray-300 font-semibold mb-2">Descrição do Challenge</label>
                        <input
                            type="text"
                            name="descricao"
                            id="idDescricao"
                            value={challenge.descricao}
                            onChange={(e) => setChallenge({ ...challenge, descricao: e.target.value })}
                            placeholder="Descreva o Challenge"
                            required
                            className="w-full px-4 py-2 border border-gray-500 rounded-md bg-blue-950 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="idFeedback" className="block text-gray-300 font-semibold mb-2">Feedback do Challenge</label>
                        <input
                            type="text"
                            name="feedback"
                            id="idFeedback"
                            value={challenge.feedback}
                            onChange={(e) => setChallenge({ ...challenge, feedback: e.target.value })}
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
