"use client";

import Image from "next/image";
import Logo from "@/app/assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

export default function ResgatarCupom() {
    const router = useRouter();
    const [codigo, setCodigo] = useState('');
    const usuario_id = localStorage.getItem('userId');

    const resgatarCupom = async () => {
        if (!usuario_id) {
            alert('Usuário não autenticado.');
            return;
        }

        try {
            const response = await api.post("/resgatar_cupom", {
                codigo, usuario_id
            });

            if (response?.data?.success) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                // toast.success(response.data.success);

                // Opcional: Redirecionar após um tempo
                // setTimeout(() => {
                //     router.push('/home'); // Redireciona para a página inicial
                // }, 3000);
            } else {
                console.error('Resposta do servidor inválida:', response);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Erro ao processar a requisição');
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
                            className="bg-purple-100 border border-purple-500 w-80 h-10 rounded-3xl m-1 p-5 w-[100%]"
                            style={{ textTransform: "uppercase" }}
                        />
                        <button
                            onClick={resgatarCupom}
                            className="bg-purple-500 hover:bg-purple-600 w-[100%] h-12 rounded-3xl text-purple-50 mt-10 p-2 flex items-center justify-center">
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