from connection import PostgresConnection
from flask import Flask, jsonify, request

def animal_cadastro():
    data = request.json
    id = data.get("id")
    nome_comum = data.get("nome_comum")
    nome_cientifico = data.get("nome_cientifico")
    habitat = data.get("habitat")
    descricao = data.get("descricao")
    ativo = data.get("ativo")
    
    if nome_comum is None or nome_cientifico is None or habitat is None or descricao is None or ativo is None:
        return jsonify({"error": "Campos obrigatórios não fornecidos."}), 400
    
    fields = ['nome_comum', 'nome_cientifico', 'habitat', 'descricao', 'ativo']
    values = [nome_comum, nome_cientifico, habitat, descricao, ativo]

    try:
        if id:
            fields_values = []
            for f, v in zip(fields, values):
                if isinstance(v, str) and v != '':
                    fields_values.append(f"{v}")
                elif isinstance(v, int) and v > 0:
                    fields_values.append(f"{v}")
                else:
                    fields_values.append(None)
            fields_values.append(id)
            fields = ', '.join([f"{field} = %s" for field in fields])

            PostgresConnection.update('ANIMAL', fields, "ID = %s", fields_values)
            return jsonify({"success": "Dados atualizados com sucesso."}), 200
        else:
            fields_values = []
            for f, v in zip(fields, values):
                if isinstance(v, str) and v != '':
                    fields_values.append(f"'{v}'")
                elif isinstance(v, int) and v > 0:
                    fields_values.append(str(v))
            fields = [f for f, v in zip(fields, values) if isinstance(v, str) and v != '' or isinstance(v, int) and v > 0]

            PostgresConnection.insert('ANIMAL', ', '.join(fields), ', '.join(fields_values))
            return jsonify({"success": "Dados inseridos com sucesso."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def animal_detalhes(id):
    try:
        query = f"SELECT NOME_COMUM, NOME_CIENTIFICO, HABITAT, DESCRICAO, ATIVO FROM ANIMAL WHERE ID = {id}"
        animal = PostgresConnection.select(query)
        if animal:
            return jsonify(animal), 200
        else:
            return jsonify({"error": "animal não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def animal_consulta():
    try:
        query = f"SELECT ID, \
                        NOME_COMUM, \
                        ATIVO \
                    FROM ANIMAL \
                ORDER BY NOME_COMUM"

        animals = PostgresConnection.select(query)
        
        return jsonify(animals), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def animal_for_combo():
    try:
        query = f"SELECT ID, NOME FROM ANIMAL ORDER BY 2"

        return PostgresConnection.select(query)
    except Exception as e:
        return jsonify({"error": str(e)}), 500