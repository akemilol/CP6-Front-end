import Link from 'next/link';

const Header = () => {
return (
    <nav className="bg-gray-800 p-4 text-white">
    <ul className="flex space-x-4">
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/checkpoints">CheckPoints</Link></li>
        <li><Link href="/globalsolution">GlobalSolution</Link></li>
        <li><Link href="/challengersprints">Challenger Sprints</Link></li>
    </ul>
    </nav>
);
};

export default Header;