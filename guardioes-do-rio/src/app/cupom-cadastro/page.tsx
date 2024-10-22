"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";
import { faCheck, faHouse, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from "next/navigation";

export default function Cupom_Cadastro() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [codigo, setCodigo] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [escolaId, setEscolaId] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [ativo, setAtivo] = useState(true);
    const [dataValidade, setDataValidade] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");

    function calcularDataValidade() {
        const data = new Date();
        data.setDate(data.getDate() + 7);
    
        const offset = data.getTimezoneOffset() * 60000;
        const dataLocal = new Date(data.getTime() - offset);
    
        return dataLocal.toISOString().slice(0, 16);
    }

    async function carregarCupom() {
        if (id) {
            try {
                const response = await api.get(`/cupom_detalhes/${id}`);
                const cupom = response.data;
                setCodigo(cupom[0][0]);
                setEscolaId(cupom[0][1]);
                setAnimalId(cupom[0][2]);
                setDataValidade(cupom[0][3]);
                setAtivo(cupom[0][4]);
                setDataCadastro(cupom[0][5]);
            } catch (error: any) {
                toast.error(error.response?.data?.error || 'Erro ao processar a requisição');
            }
        } else {
            setDataValidade(calcularDataValidade());
        }
    }

    useEffect(() => {
        carregarCupom();
    }, [id]);

    async function salvar() {
        try {
            const response = await api.post("/cupom_cadastro", {
                codigo, quantidade, escolaId, animalId, ativo, dataValidade, dataCadastro, id
            });

            if (response?.data?.success) {
                toast.success(response.data.success);
            } else {
                console.error('Resposta do servidor inválida:', response);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Erro ao processar a requisição');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div>
                <h1 className="text-green-500 font-black text-2xl">GERAR CÓDIGOS</h1>
            </div>
            <div className="w-full max-w-md space-y-4">
                <div>
                    <label htmlFor="quantidade" className="text-green-500 font-black">QUANTIDADE:</label>
                    <input
                        type="number"
                        id="quantidade"
                        placeholder="Quantidade"
                        className="p-2 border rounded"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="escola" className="text-green-500 font-black">ESCOLA:</label>
                    <input
                        type="number"
                        id="escola"
                        placeholder="ID da Escola"
                        className="p-2 border rounded"
                        value={escolaId}
                        onChange={(e) => setEscolaId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="animal" className="text-green-500 font-black">ANIMAL:</label>
                    <input
                        type="number"
                        id="animal"
                        placeholder="ID do Animal"
                        className="p-2 border rounded"
                        value={animalId}
                        onChange={(e) => setAnimalId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="validade" className="text-green-500 font-black">VALIDADE:</label>
                    <input
                        type="datetime-local"
                        id="validade"
                        className="p-2 border rounded"
                        value={dataValidade}
                        onChange={(e) => setDataValidade(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={ativo}
                        onChange={(e) => setAtivo(e.target.checked)}
                    />
                    <span className="ml-2">Ativo</span>
                </div>
                <button onClick={salvar} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Gerar Cupons
                </button>
            </div>
            <div className="mt-10">
                    <button onClick={() => router.push('/cupom-consulta')} className="bg-green-300 hover:bg-green-400 w-12 h-12 rounded-full">
                        <FontAwesomeIcon icon={faHouse} className="h-10 w-6 mb-2 text-green-500" />
                    </button>
                </div>
            <ToastContainer />
        </div>
    );
}
