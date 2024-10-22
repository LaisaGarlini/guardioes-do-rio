from connection import PostgresConnection
from flask import Flask, jsonify, request
import random
import string

def gerar_codigo_aleatorio(tamanho=8):
    """Gera um código aleatório com letras maiúsculas e números."""
    caracteres = string.ascii_uppercase + string.digits
    return ''.join(random.choices(caracteres, k=tamanho))

def cupom_cadastro():
    data = request.json
    id = data.get("id")
    codigo = data.get("codigo")
    quantidade = data.get("quantidade")
    escolaId = data.get("escolaId")
    animalId = data.get("animalId")
    ativo = data.get("ativo")
    dataValidade = data.get("dataValidade")
    
    if quantidade is None or escolaId is None or animalId is None:
        return jsonify({"error": "Campos obrigatórios não fornecidos."}), 400
    
    try:
        for _ in range(quantidade):
            codigo = gerar_codigo_aleatorio()
        
            fields = ['codigo', 'escola_id', 'animal_id', 'data_validade', 'ativo']
            values = [codigo, escolaId, animalId, dataValidade, ativo]

            fields_values = [f"'{v}'" if isinstance(v, str) else str(v) for v in values]
            PostgresConnection.insert('cupom', ', '.join(fields), ', '.join(fields_values))

        return jsonify({"success": f"{quantidade} cupons gerados e inseridos com sucesso."}), 201

    except Exception as e:
        return jsonify({"error": f"Erro ao inserir cupons: {str(e)}"}), 500
    
def cupom_detalhes(id):
    try:
        query = f"SELECT NOME_COMUM, NOME_CIENTIFICO, HABITAT, DESCRICAO, ATIVO FROM cupom WHERE ID = {id}"
        cupom = PostgresConnection.select(query)
        if cupom:
            return jsonify(cupom), 200
        else:
            return jsonify({"error": "cupom não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def cupom_consulta():
    try:
        query = f"SELECT C.ID, \
                         C.CODIGO, \
                         C.ESCOLA_ID, \
                         E.NOME, \
                         C.ANIMAL_ID, \
                         A.NOME_COMUM, \
                         TO_CHAR(C.DATA_VALIDADE, 'DD/MM/YYYY HH24:MM:SS') AS DATA_VALIDADE, \
                         C.ATIVO, \
                         TO_CHAR(C.DATA_CADASTRO, 'DD/MM/YYYY HH24:MM:SS') AS DATA_CADASTRO \
                    FROM CUPOM C \
                    JOIN ESCOLA E ON E.ID = C.ESCOLA_ID \
                    JOIN ANIMAL A ON A.ID = C.ANIMAL_ID \
                   ORDER BY C.DATA_CADASTRO DESC, C.DATA_VALIDADE, C.CODIGO"

        cupons = PostgresConnection.select(query)
        
        return jsonify(cupons), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
from datetime import datetime

def resgatar_cupom():
    data = request.json
    codigo = data.get("codigo")
    usuario_id = data.get("usuario_id")

    if not codigo or not usuario_id:
        return jsonify({"error": "Código e ID do usuário são obrigatórios."}), 400

    try:
        query = f"SELECT ID FROM CUPOM WHERE CODIGO = '{codigo}' AND ATIVO = TRUE AND DATA_VALIDADE >= NOW()"

        cupom_id = PostgresConnection.select(query)
    
        if not cupom_id:
            return jsonify({"error": "Cupom inválido ou expirado."}), 404

        fields = ['usuario_id', 'cupom_id', 'data_resgate']
        values = [usuario_id, cupom_id[0][0], datetime.now()]

        fields_values = [str(v) if isinstance(v, int) else f"'{v}'" for v in values]
        fields_values[2] = f"'{values[2].strftime('%Y-%m-%d %H:%M:%S')}'"

        print(fields_values)

        PostgresConnection.insert('cupom_resgatado', ', '.join(fields), ', '.join(fields_values))

        # update_query = f"UPDATE CUPOM SET ATIVO = FALSE WHERE ID = {cupom_id[0][0]}"
        # print(update_query)
        PostgresConnection.update('CUPOM', "ATIVO = FALSE", f"ID = {cupom_id[0][0]}")

        return jsonify({"success": "Cupom resgatado com sucesso e desativado."}), 200

    except Exception as e:
        return jsonify({"error": f"Erro ao resgatar cupom: {str(e)}"}), 500