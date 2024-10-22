from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2 import Error
from animal import animal_cadastro, animal_consulta, animal_detalhes, animal_for_combo
from cupom import cupom_cadastro, cupom_consulta, resgatar_cupom
from connection import PostgresConnection
from flask import Flask, jsonify, request
import logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/cofrinho'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

from models import animal, cupom_resgatado, cupom, escola, usuario

logging.basicConfig(level=logging.DEBUG)

#animal    
app.route('/animal_cadastro', methods=["POST"])(animal_cadastro)
app.route('/animal_detalhes/<int:id>', methods=["GET"])(animal_detalhes)
app.route('/animal_consulta', methods=["GET"])(animal_consulta)
app.route('/animal_for_combo', methods=["GET"])(animal_for_combo)

#cupom    
app.route('/cupom_cadastro', methods=["POST"])(cupom_cadastro)
# app.route('/cupom_detalhes/<int:id>', methods=["GET"])(cupom_detalhes)
app.route('/cupom_consulta', methods=["GET"])(cupom_consulta)
app.route('/resgatar_cupom', methods=["POST"])(resgatar_cupom)

@app.route('/login', methods=["GET"])
def login():
    try:
        codigo = request.args.get('codigo')
        senha = request.args.get('senha')
        query = "SELECT ID, SENHA, NOME, TIPO FROM USUARIO WHERE ID = %s AND SENHA = %s"
        result = PostgresConnection.select(query, codigo, senha)
        if result:
            return jsonify({"success": "Dados de login corretos.", "result": {"nome" : result[0][2], "tipo" : result[0][3]}}), 200
        else:
            return jsonify({"error": "Código ou senha incorretos."}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/excluir", methods=["POST"])
def excluir():
    try:
        data = request.json
        ids = data.get("IDs_selecionados")
        tabela = data.get("Tabela")

        if not ids:
            return jsonify({"error": "IDs não fornecidos"}), 400

        condition = f"ID IN ({', '.join(map(str, ids))})"
        
        logging.debug(f"Executando DELETE com condição: {condition} na tabela {tabela}")
        
        PostgresConnection.delete(tabela, condition)

        return jsonify({"success": "Dados excluídos com sucesso."}), 200

    except psycopg2.IntegrityError as e:
        if "violates foreign key constraint" in str(e):
            return jsonify({"error": "Não é possível excluir o cupom, pois ele está sendo referenciado em outra tabela."}), 400
        else:
            logging.error(f"Erro de integridade: {str(e)} - {e.pgerror}")
            return jsonify({"error": f"Violação de integridade: {e.pgerror}"}), 400
    except Exception as e:
        logging.error(f"Erro inesperado: {str(e)}")
        return jsonify({"error": f"Erro inesperado: {str(e)}"}), 500
    
@app.route('/ranking', methods=["GET"])
def ranking():
    try:
        query = f"SELECT U.NOME, COUNT(*) AS QUANTIDADE_CUPONS \
                    FROM CUPOM_RESGATADO CR \
                    JOIN USUARIO U ON U.ID = CR.USUARIO_ID \
                   GROUP BY U.ID \
                   ORDER BY 2 DESC"

        ranking = PostgresConnection.select(query)
        
        return jsonify(ranking), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)