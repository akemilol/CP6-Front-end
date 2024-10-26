    //ID: Id da avaliação,
    //Materia: De qual materia é,
    //Nome: Qual a avaliação (CP5, Sprint1, Global Solution 1,etc)
    //Nota: Nota dada de 0 a 100.

export type TipoCheckpoint = {
    id:number;
    materia:string;
    nome:string;
    nota:number;
    aluno:string;
    descricao:string;
    feedback:string;
}

export type TipoGlobal = {
    id:number;
    materia:string;
    nome:string;
    nota:number;
    aluno:string;
    descricao:string;
    feedback:string;
}

export type TipoChallenge = {
    id:number;
    materia:string;
    nome:string;
    nota:number;
    aluno:string;
    descricao:string;
    feedback:string;
}