import Link from 'next/link';

export default function Cabecalho() {
return (
    <nav className="cabecalho">
        <ul className="flex space-x-4 justify-center">
            <li className="hover:text-cyan-950 transition duration-300">
            <Link href="/">Home</Link>
            </li>
            <li className="hover:text-cyan-950 transition duration-300">
            <Link href="/checkpoints">CheckPoints</Link>
            </li>
            <li className="hover:text-cyan-950 transition duration-300">
            <Link href="/globalsolution">GlobalSolution</Link>
            </li>
            <li className="hover:text-cyan-950 transition duration-300">
            <Link href="/challengersprints">Challenger Sprints</Link>
            </li>
        </ul>
    </nav>
);
};
