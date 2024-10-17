from connection import PostgresConnection
from flask import Flask, jsonify, request

# def cupom_cadastro():
#     data = request.json
#     id = data.get("id")
#     nome_comum = data.get("nome_comum")
#     nome_cientifico = data.get("nome_cientifico")
#     habitat = data.get("habitat")
#     descricao = data.get("descricao")
#     ativo = data.get("ativo")
    
#     if nome_comum is None or nome_cientifico is None or habitat is None or descricao is None or ativo is None:
#         return jsonify({"error": "Campos obrigatórios não fornecidos."}), 400
    
#     fields = ['nome_comum', 'nome_cientifico', 'habitat', 'descricao', 'ativo']
#     values = [nome_comum, nome_cientifico, habitat, descricao, ativo]

#     try:
#         if id:
#             fields_values = []
#             for f, v in zip(fields, values):
#                 if isinstance(v, str) and v != '':
#                     fields_values.append(f"{v}")
#                 elif isinstance(v, int) and v > 0:
#                     fields_values.append(f"{v}")
#                 else:
#                     fields_values.append(None)
#             fields_values.append(id)
#             fields = ', '.join([f"{field} = %s" for field in fields])

#             PostgresConnection.update('cupom', fields, "ID = %s", fields_values)
#             return jsonify({"success": "Dados atualizados com sucesso."}), 200
#         else:
#             fields_values = []
#             for f, v in zip(fields, values):
#                 if isinstance(v, str) and v != '':
#                     fields_values.append(f"'{v}'")
#                 elif isinstance(v, int) and v > 0:
#                     fields_values.append(str(v))
#             fields = [f for f, v in zip(fields, values) if isinstance(v, str) and v != '' or isinstance(v, int) and v > 0]

#             PostgresConnection.insert('cupom', ', '.join(fields), ', '.join(fields_values))
#             return jsonify({"success": "Dados inseridos com sucesso."}), 201
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
# def cupom_detalhes(id):
#     try:
#         query = f"SELECT NOME_COMUM, NOME_CIENTIFICO, HABITAT, DESCRICAO, ATIVO FROM cupom WHERE ID = {id}"
#         cupom = PostgresConnection.select(query)
#         if cupom:
#             return jsonify(cupom), 200
#         else:
#             return jsonify({"error": "cupom não encontrado"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
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