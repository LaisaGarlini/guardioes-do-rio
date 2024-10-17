"use client";

import Image from "next/image";
import Logo from "@/app/assests/logo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const router = useRouter();
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await api.get('/login', { params: { codigo, senha } });

      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', codigo);
        localStorage.setItem('userName', response.data.result.nome);
        localStorage.setItem('userType', response.data.result.tipo); 
        localStorage.setItem('sessionStart', new Date().getTime().toString());
        router.push(`/home`);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert("Erro ao fazer login: " + error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionStart = localStorage.getItem('sessionStart');
    const userId = localStorage.getItem('userId');
    const sessionTimeout = 3600000;

    if (token && sessionStart && userId) {
      const elapsedTime = new Date().getTime() - parseInt(sessionStart);

      if (elapsedTime > sessionTimeout) {
        localStorage.clear();
      } else {
        localStorage.setItem('sessionStart', new Date().getTime().toString());
        router.push(`/home`);
      }
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <Image src={Logo} alt="Logo Guardiões do Rio" width={350} />
      </div>
      <div className="mt-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <label htmlFor="codigo" className="text-purple-500 font-black">CÓDIGO:</label>
            <input 
              type="text" 
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="bg-purple-100 border border-purple-500 h-7 rounded-3xl p-1 mx-2 w-24"
            />
          </div>
          <div>
            <label htmlFor="senha" className="text-purple-500 font-black">SENHA:</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-purple-100 border border-purple-500 h-7 rounded-3xl p-1 mx-2 my-2 w-24"
            />
          </div>
          <button 
            onClick={login}
            className="bg-purple-500 hover:bg-purple-600 h-8 rounded-3xl text-purple-50 mt-8 w-24"
          >
            ENTRAR
          </button>
        </div>
      </div>
    </div>
  );
}