"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import Sagui from "@/app/assests/sagui.png";
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
                <h1 className="text-purple-600 text-2xl font-bold">SAGUI-DO-MATO</h1>
            </div>
            <div className="relative z-10 text-purple-600 text-center p-4 mt-10 w-3/5 bg-white rounded-3xl shadow-2xl shadow-slate-400 text-base">
                <nav>
                    O sagui-do-mato (Callithrix penicillata) é uma espécie de primata nativa do Brasil, com destaque para a região de Santa Catarina. Este pequeno macaco, que se caracteriza por seu tamanho compacto e pelo pelo suave, apresenta coloração variada, geralmente em tons de cinza, preto e branco. O sagui-do-mato é conhecido por suas bochechas peludas e cauda longa, que o ajuda a se equilibrar nas árvores.
                </nav>
            </div>
            <div className="relative z-10 mt-10">
                <Image
                    src={Sagui}
                    alt="Sagui"
                    width={200}
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