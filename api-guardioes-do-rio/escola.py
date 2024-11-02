from connection import PostgresConnection
from flask import jsonify, request

def escola_consulta():
    try:
        query = f"""
        SELECT ID, 
               NOME, 
               ENDERECO, 
               EMAIL, 
               CELULAR, 
               ATIVO 
        FROM ESCOLA 
        ORDER BY DATA_CADASTRO DESC
        """

        escolas = PostgresConnection.select(query)
        
        return jsonify(escolas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
