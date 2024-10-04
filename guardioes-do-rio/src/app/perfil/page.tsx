"use client";

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Perfil() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen m-4">
            <div>
                <h1 className="text-blue-500 font-black text-xl m-5 p-1">MEU ÁLBUM</h1>
            </div>
            <li className="flex items-center">
              <p className="ml-4 p-1">
                Parabéns Laisa, você resgatou 1 figurinha
              </p>
            </li>
            <li className="flex items-center">
              <p className="ml-4 p-1">
                Isso corresponde a 0,1% resgatado na sua escola
              </p>
            </li>
            <li className="flex items-center">
              <p className="ml-4 p-1">
                Continue ajudando o meio-ambiente!
              </p>
            </li>

            <div className="mt-10">
                    <button onClick={() => router.push('/home')} className="bg-purple-300 hover:bg-purple-400 w-12 h-12 rounded-full">
                        <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-purple-500" />
                    </button>
                </div>
            </div>

    )
}   