"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Ranking() {
    const router = useRouter();

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
                            <th className="text-left">ALUNO</th>
                            <th className="text-right">TOTAL DE FIGURINHAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-left px-1">LAISA GARLINI</td>
                                <td className="text-right px-1">90</td>
                            </tr>
                            <tr className='bg-green-200'>
                                <td className="text-left px-1">ANA GABRIELA LIMA</td>
                                <td className="text-right px-1">13</td>
                            </tr>
                            <tr>
                                <td className="text-left px-1">RAMON DIEGO VALENTIM</td>
                                <td className="text-right px-1">22</td>
                            </tr>
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