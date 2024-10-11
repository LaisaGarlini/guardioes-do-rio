"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Animal_Consulta() {
    const [animais, setAnimais] = useState<[]>([]);

    async function carregarAnimais() {
        try {
            const response = await api.get("/animal_consulta", {
            });
            const data = response.data;
            setAnimais(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
          await carregarAnimais();
        }
        fetchData();
      }, []);  

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div>
                <h1 className="text-green-500 font-black text-xl">ANIMAIS</h1>
            </div>
            <div className="mt-8 flex flex-col items-center">
                <table className='w-2/3'>
                    <thead className='text-lg'>
                        <tr>
                            <td className='w-10'>ID</td>
                            <td className='w-[250px]'>Nome</td>
                            <td className='w-[50px]'>Ativo</td>
                        </tr>
                    </thead>
                    <tbody className='text-base'>
                        {animais.map((animal: any, index) => (
                            <tr key={index}>
                                <td>{animal[0]}</td>
                                <td>{animal[1]}</td>
                                <td>{animal[2] ? "Sim" : "Não"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}