"use client";

import Image from "next/image";
import Logo from "@/app/assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function ResgatarCupom() {
    const router = useRouter();
    const [codigo, setCodigo] = useState('');

    const resgatarCupom = () => {
        if (codigo === '123') {
            confetti();
        } else {
            alert('Código inválido. Tente novamente.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <Image
                    src={Logo}
                    alt="Logo Guardiões do Rio"
                    width={350}
                />
            </div>
            <div className="mt-2 flex flex-col items-center">
                <div>
                    <h1 className="text-green-500 font-black">COLECIONANDO ECOSSISTEMAS</h1>
                </div>
                <div className="mt-10">
                    <div className="flex flex-col items-center">
                        <label htmlFor="codigo" className="text-purple-500 font-black">DIGITE ABAIXO O CÓDIGO QUE VOCÊ ENCONTROU</label>
                        <input 
                            type="text" 
                            placeholder="Informe o código" 
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="bg-purple-100 border border-purple-500 w-80 h-7 rounded-3xl p-1"
                            style={{ textTransform: "uppercase" }} 
                        />
                        <button 
                            onClick={resgatarCupom}
                            className="bg-purple-500 hover:bg-purple-600 w-80 h-8 rounded-3xl text-purple-50 mt-10">
                            RESGATAR
                        </button>
                    </div>
                </div>
                <div className="mt-10">
                    <button onClick={() => router.push('/home')} className="bg-purple-300 hover:bg-purple-400 w-12 h-12 rounded-full">
                        <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-purple-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}  