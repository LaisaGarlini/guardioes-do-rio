"use client";

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Perfil() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen m-4">
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-blue-500 font-black text-xl m-5 p-1">MEU PERFIL</h1>
        <li className="flex items-center bg-blue-500 bg-opacity-50 text-blue-500 font-medium rounded-md p-[2%] mb-[2%]">
          <p className="ml-4 p-1">Junte figurinhas e ajude o meio ambiente!</p>
        </li>
        <li className="flex items-center">
          <p className="ml-4 p-1">Parabéns Laisa, você resgatou 1 figurinha</p>
        </li>
        <li className="flex items-center">
          <p className="ml-4 p-1">Isso corresponde a 0,1% resgatado na sua escola</p>
        </li>
        <li className="flex items-center">
          <p className="ml-4 p-1">Continue ajudando o meio-ambiente!</p>
        </li>
      </div>

      <div className="flex justify-center mt-[50%]"> {/* Usando mt-auto para empurrar para o final */}
        <button onClick={() => router.push('/home')} className="bg-purple-300 hover:bg-purple-400 w-12 h-12 rounded-full">
          <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-purple-500" />
        </button>
      </div>
    </div>
  );
}
