"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Tamandua from "@/app/assests/Tamandua.png";
import Mata from "@/app/assests/mata.png";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ranking() {
    const router = useRouter();

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${Mata.src})` }}
            ></div>
            
            <div className="relative z-10">
                <h1 className="text-purple-600 text-3xl font-bold">Tamanduá</h1>
            </div>
            <div className="relative z-10 text-purple-600 text-center p-4 mt-10 w-3/5 bg-white rounded-3xl shadow-2xl shadow-slate-400">
                <nav>
                Tamandua é um gênero de mamíferos da família Myrmecophagidae. É um animal de aparência curiosa. Sua cabeça alongada, que se prolonga pelo focinho, parece um grande tubo. Por não possuir dentes, ele usa as fortes patas dianteiras, dotadas de grandes garras, para destruir formigueiros e cupinzeiros.
                </nav>
            </div>
            <div className="relative z-10 mt-10">
                <Image
                    src={Tamandua}
                    alt="Tamandua"
                    width={250}
                    className="rounded-3xl shadow-lg"
                />
            </div>
            <div className="relative z-20 mt-10">
                <button onClick={() => router.push('/album')} className="bg-green-300 hover:bg-green-400 w-12 h-12 rounded-full">
                    <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-green-500" />
                </button>
            </div>
        </div>
    );
}