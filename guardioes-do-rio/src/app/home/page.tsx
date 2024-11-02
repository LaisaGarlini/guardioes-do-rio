"use client";

import Image from "next/image";
import Logo from "@/app/assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faImages, faRankingStar, faUser, faListOl, faSchool } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <Image
                    src={Logo}
                    alt="Logo Guardiões do Rio"
                    width={300}
                />
            </div>
            <div className="mt-4">
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => router.push('/resgatar-cupom')}
                        className="bg-green-300 hover:bg-green-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                    >
                        <FontAwesomeIcon icon={faTicket} className="h-10 w-10 mb-2 text-green-500" />
                        <p className="text-green-500">Resgatar Cupom</p>
                    </button>
                    <button
                        onClick={() => router.push('/escola-cadastro')}
                        className="bg-purple-300 hover:bg-purple-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                    >
                        <FontAwesomeIcon icon={faSchool} className="h-10 w-10 mb-2 text-purple-500" />
                        <p className="text-purple-500">Cadastrar Escola</p>
                    </button>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={() => router.push('/ranking')}
                        className="bg-purple-300 hover:bg-purple-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                    >
                        <FontAwesomeIcon icon={faRankingStar} className="h-10 w-10 mb-2 text-purple-500" />
                        <p className="text-purple-500">Ranking</p>
                    </button>
                    <button
                        onClick={() => router.push('/perfil')}
                        className="bg-green-300 hover:bg-green-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                    >
                        <FontAwesomeIcon icon={faUser} className="h-10 w-10 mb-2 text-green-500" />
                        <p className="text-green-500">Meu Perfil</p>
                    </button>
                </div>

                {userType === '1' && (
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={() => router.push('/cupom-consulta')}
                            className="bg-green-300 hover:bg-green-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                        >
                            <FontAwesomeIcon icon={faListOl} className="h-10 w-10 mb-2 text-green-500" />
                            <p className="text-green-500">Ver Cupons</p>
                        </button>
                        <button
                            onClick={() => router.push('/album')}
                            className="bg-purple-300 hover:bg-purple-400 w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400 flex justify-center items-center flex-col transition duration-200"
                        >
                            <FontAwesomeIcon icon={faImages} className="h-10 w-10 mb-2 text-purple-500" />
                            <p className="text-purple-500">Ver álbum</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}