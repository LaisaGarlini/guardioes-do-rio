"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cupom_Consulta() {
    const [cupons, setCupons] = useState<[]>([]);

    async function carregarCupons() {
        try {
            const response = await api.get("/cupom_consulta");
            const data = response.data;
            setCupons(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        carregarCupons();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-green-500 font-black text-2xl mb-6">
                CUPONS
            </h1>

            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-3 px-4 text-left w-7">Código</th>
                            <th className="py-3 px-4 text-left w-28">Data de Cadastro</th>
                            <th className="py-3 px-4 text-left w-28">Data de Validade</th>
                            <th className="py-3 px-4 text-center w-7">Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cupons.map((dados: any, index) => (
                            <tr
                                key={index}
                                className="border-b last:border-none hover:bg-gray-100"
                            >
                                <td className="py-3 px-4">{dados[1]}</td>
                                <td className="py-3 px-4 w-24">{dados[8]}</td>
                                <td className="py-3 px-4">{dados[6]}</td>
                                <td className="py-3 px-4 text-center">
                                    {dados[7] && (
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="text-green-500"
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
