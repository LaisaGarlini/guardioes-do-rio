"use client";

import Image from "next/image";
import Logo from "@/app/assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <Image
                    src={Logo}
                    alt="Logo Guardiões do Rio"
                    width={350}
                />
            </div>
            <div className="mt-8">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => router.push('/resgatar-cupom')} className="bg-green-300 hover:bg-green-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200">
                        <FontAwesomeIcon icon={faTicket} className="h-10 w-10 mb-2 text-green-500" />
                        <p className="text-green-500" >Resgatar Cupom</p>
                    </button>
                    <button onClick={() => router.push('/album')} className="bg-purple-300 hover:bg-purple-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200">
                        <FontAwesomeIcon icon={faImages} className="h-10 w-10 mb-2 text-purple-500" />
                        <p className="text-purple-500">Ver álbum</p>
                    </button>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={() => router.push('/ranking')} className="bg-purple-300 hover:bg-purple-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200">
                        <FontAwesomeIcon icon={faRankingStar} className="h-10 w-10 mb-2 text-purple-500" />
                        <p className="text-purple-500">Ranking</p>
                    </button>
                    <button onClick={() => router.push('/perfil')}className="bg-green-300 hover:bg-green-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200">
                        <FontAwesomeIcon icon={faUser} className="h-10 w-10 mb-2 text-green-500" />
                        <p className="text-green-500">Meu Perfil</p>
                    </button>
                </div>
            </div>
        </div>
    );
}   