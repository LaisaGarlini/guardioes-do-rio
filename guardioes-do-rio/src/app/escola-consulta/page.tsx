"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";
import { faCheck, faHouse, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function Escola_Consulta() {
    const [escolas, setEscolas] = useState<any[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const router = useRouter();

    async function carregarEscolas() {
        try {
            const response = await api.get("/escola_consulta");
            setEscolas(response.data);
        } catch (error) {
            console.error("Erro ao carregar escolas:", error);
            toast.error("Erro ao carregar escolas.");
        }
    }

    function handleSelect(id: number) {
        if (selected.includes(id)) {
            setSelected(selected.filter((selId) => selId !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    async function excluirSelecionados() {
        if (selected.length === 0) {
            toast.warning("Nenhuma escola selecionada para exclusão.");
            return;
        }

        try {
            const response = await api.post("/excluir", {
                IDs_selecionados: selected,
                Tabela: "ESCOLA"
            });

            if (response.status === 200 && response.data.success) {
                toast.success(response.data.success);
                carregarEscolas();
                setSelected([]);
            } else {
                throw new Error("Erro ao excluir escolas.");
            }
        } catch (error) {
            const err = error as any;
            if (err.response) {
                toast.error(err.response.data.error || "Erro inesperado.");
            } else {
                toast.error("Erro inesperado.");
            }
        }
    }    

    useEffect(() => {
        carregarEscolas();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex justify-between items-center w-full max-w-4xl mb-6">
                <h1 className="text-green-500 font-black text-2xl">ESCOLAS</h1>
                <div className="flex space-x-4">
                    <button onClick={() => router.push("/escola-cadastro")} className="p-2">
                        <FontAwesomeIcon icon={faPlus} className="text-green-500 text-xl" />
                    </button>
                    <button onClick={excluirSelecionados} className="p-2">
                        <FontAwesomeIcon icon={faTrash} className="text-red-500 text-xl" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-3 px-2 text-center w-4">
                                <input
                                    type="checkbox"
                                    checked={selected.length === escolas.length}
                                    onChange={() => {
                                        if (selected.length === escolas.length) {
                                            setSelected([]);
                                        } else {
                                            setSelected(escolas.map(escola => escola[0]));
                                        }
                                    }}
                                />
                            </th>
                            <th className="py-3 px-2 text-left">Nome</th>
                            <th className="py-3 px-2 text-left">Endereço</th>
                            <th className="py-3 px-2 text-left">Email</th>
                            <th className="py-3 px-2 text-left">Celular</th>
                            <th className="py-3 px-2 text-center">Ativo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {escolas.map((dados: any, index) => (
                            <tr key={index} className="border-b last:border-none hover:bg-gray-100">
                                <td className="py-3 px-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(dados[0])}
                                        onChange={() => handleSelect(dados[0])}
                                    />
                                </td>
                                <td className="py-3 px-2">{dados[1]}</td>
                                <td className="py-3 px-2">{dados[2]}</td>
                                <td className="py-3 px-2">{dados[3]}</td>
                                <td className="py-3 px-2">{dados[4]}</td>
                                <td className="py-3 px-2 text-center">
                                    {dados[5] && (
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
            <div className="mt-10">
                <button onClick={() => router.push('/home')} className="bg-green-300 hover:bg-green-400 w-12 h-12 rounded-full">
                    <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-green-500" />
                </button>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}
