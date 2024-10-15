"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Ranking() {
    const router = useRouter();

    const [ranking, setRanking] = useState<[]>([]);

    async function carregarRanking() {
        try {
            const response = await api.get("/ranking", {
            });
            const data = response.data;
            setRanking(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
          await carregarRanking();
        }
        fetchData();
      }, []);

    return (
        <div>
            <div className="mt-2 flex flex-col items-center">
                <div className="mt-5">
                    <h1 className="text-green-500 font-black text-xl">CLASSIFICAÇÃO</h1>
                </div>
                <div className="mt-8">
                    <table>
                        <thead className='bg-green-300 rounded-sm'>
                            <tr>
                            <th className="text-left w-32">ALUNO</th>
                            <th className="text-right">TOTAL DE FIGURINHAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((dados: any, index) => (
                                <tr key={index}>
                                    <td className="text-left px-1">{dados[0]}</td>
                                    <td className="text-center px-1">{dados[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10">
                    <button onClick={() => router.push('/home')} className="bg-green-300 hover:bg-green-400 w-12 h-12 rounded-full">
                        <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-green-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}   