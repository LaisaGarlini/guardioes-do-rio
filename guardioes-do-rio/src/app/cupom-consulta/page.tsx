"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function Cupom_Consulta() {
    const [cupons, setCupons] = useState<any[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const router = useRouter();

    async function carregarCupons() {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('ID do usuário não encontrado.');
                return;
            }
            
            const response = await api.get("/cupom_consulta", {
                headers: {
                    Authorization: userId
                }
            });
            const data = response.data;
            setCupons(data);
        } catch (error) {
            console.error(error);
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
            toast.warning("Nenhum cupom selecionado para exclusão.");
            return;
        }
    
        try {
            const response = await api.post("/excluir", {
                IDs_selecionados: selected,
                Tabela: "CUPOM"
            });
    
            if (response.status === 200 && response.data.success) {
                toast.success(response.data.success);
                carregarCupons();
                setSelected([]);
            } else {
                throw new Error("Erro ao excluir cupons.");
            }
        } catch (error) {
            const err = error as any;
            if (err.response) {
                console.log("Dados do erro:", err.response.data);
                toast.error(err.response.data.error || "Erro inesperado.");
            } else if (err.request) {
                console.error("Nenhuma resposta recebida:", err.request);
                toast.error("Nenhuma resposta do servidor.");
            } else {
                console.error("Erro:", err.message);
                toast.error("Erro inesperado.");
            }
        }
    }    

    useEffect(() => {
        carregarCupons();
        toast.success("Teste de toast bem-sucedido!");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex justify-between items-center w-full max-w-4xl mb-6">
                <h1 className="text-green-500 font-black text-2xl">CUPONS</h1>
                <div className="flex space-x-4">
                    <button onClick={() => router.push("/gerar-cupom")}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="text-green-500 text-xl"
                        />
                    </button>
                    <button onClick={excluirSelecionados}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 text-xl"
                        />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-3 px-4 text-center w-4">
                                <input
                                    type="checkbox"
                                    checked={selected.length === cupons.length}
                                    onChange={() => {
                                        if (selected.length === cupons.length) {
                                            setSelected([]);
                                        } else {
                                            setSelected(cupons.map(cupom => cupom[0])); // Assume que o ID está na primeira posição
                                        }
                                    }}
                                />
                            </th>
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
                                <td className="py-3 px-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(dados[0])}
                                        onChange={() => handleSelect(dados[0])}
                                    />
                                </td>
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
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}