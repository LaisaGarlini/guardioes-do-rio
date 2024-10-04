"use client";

import Image from "next/image";
import Capivara from "@/app/assests/capivara.png";
import Lontra from "@/app/assests/lontra.png";
import Sagui from "@/app/assests/sagui.png";
import Tamandua from "@/app/assests/tamandua.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { fa1 } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <h1 className="text-green-500 font-black text-xl">MEU ÁLBUM</h1>
            </div>
            <div className="mt-8 flex flex-col items-center">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => router.push(`/capivara`)} className="w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400">
                        <Image
                            src={Capivara}
                            alt="Capivara"
                            width={350}
                            className="rounded-3xl"
                        />
                    </button>
                    <button onClick={() => router.push(`/lontra`)} className="w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400">
                        <Image
                            src={Lontra}
                            alt="Lontra"
                            width={350}
                            className="rounded-3xl"
                        />
                    </button>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={() => router.push(`/sagui`)} className="w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400">
                        <Image
                            src={Sagui}
                            alt="Sagui"
                            width={350}
                            className="rounded-3xl"
                        />
                    </button>
                    <button onClick={() => router.push(`/tamandua`)} className="w-32 h-32 rounded-3xl shadow-2xl shadow-slate-400">
                        <Image
                            src={Tamandua}
                            alt="Tamandua"
                            width={350}
                            className="rounded-3xl"
                        />
                    </button>
                </div>
                <div className="flex space-x-2 mt-12">
                    <button className="bg-green-300 hover:bg-green-400 w-8 h-8 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faAngleLeft} className="h-5 w-6 text-green-500" />
                    </button>
                    <button className="bg-green-300 hover:bg-green-400 w-8 h-8 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={fa1} className="h-5 w-6 text-green-500" />
                    </button>
                    <button className="bg-green-300 hover:bg-green-400 w-8 h-8 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon icon={faAngleRight} className="h-5 w-6 text-green-500" />
                    </button>
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