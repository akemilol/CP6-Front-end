import Image from "next/image";

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ fontSize: '2rem', color: '#fa941f' }}>404 - Página Não Encontrada</h1>
        <div className="flex justify-center">
            <Image src="/img/erro404.webp" alt="Página de erro." width={400} height={400} />
        </div>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Oops! Parece que a página que você está procurando não existe.
        </p>
        </div>
    );
}



