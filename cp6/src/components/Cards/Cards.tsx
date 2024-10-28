import Image from 'next/image';

const cards = [
    {
        foto: '/img/valeria.jpeg',
        nome: 'Valéria',
        challenger: 8.5,
        globalSolution: 9.2,
        checkpoints: 7.8,
    },
    {
        foto: '/img/eduardo.jpeg',
        nome: 'Eduardo',
        challenger: 7.9,
        globalSolution: 8.8,
        checkpoints: 8.5,
    },
    {
        foto: '/img/mirela.jpeg',
        nome: 'Mirela',
        challenger: 9.0,
        globalSolution: 9.5,
        checkpoints: 9.1,
    },
];

type CardProps = {
    foto: string;
    nome: string;
    challenger: number;
    globalSolution: number;
    checkpoints: number;
};

function Card({ foto, nome, challenger, globalSolution, checkpoints }: CardProps) {
    return (
        <div className="bg-cyan-50 rounded-lg shadow-lg p-6 w-[300px] h-[400px] text-center transform transition hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
                <Image src={foto} alt={nome} width={150} height={150} className="rounded-full" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{nome}</h2>
            <p className="text-gray-600 mb-1">
                Challenger: <span className="font-semibold">{challenger}</span>
            </p>
            <p className="text-gray-600 mb-1">
                Global Solution: <span className="font-semibold">{globalSolution}</span>
            </p>
            <p className="text-gray-600">
                Checkpoints: <span className="font-semibold">{checkpoints}</span>
            </p>
        </div>
    );
}

export default function Cards() {
    return (
        <div className="flex flex-col items-center min-h-[90vh]">
            <h1 className="text-white text-center font-bold text-4xl mt-5">Resumo dos alunos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center mt-[60px]">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        foto={card.foto}
                        nome={card.nome}
                        challenger={card.challenger}
                        globalSolution={card.globalSolution}
                        checkpoints={card.checkpoints}
                    />
                ))}
            </div>
        </div>
    );
}
