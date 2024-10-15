from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2 import Error
from animal import animal_cadastro, animal_consulta, animal_detalhes, animal_for_combo
from connection import PostgresConnection
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/cofrinho'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

from models import animal, cupom_resgatado, cupom, escola, usuario

#animal    
app.route('/animal_cadastro', methods=["POST"])(animal_cadastro)
app.route('/animal_detalhes/<int:id>', methods=["GET"])(animal_detalhes)
app.route('/animal_consulta', methods=["GET"])(animal_consulta)
app.route('/animal_for_combo', methods=["GET"])(animal_for_combo)

@app.route('/login', methods=["GET"])
def login():
    try:
        codigo = request.args.get('codigo')
        senha = request.args.get('senha')
        query = "SELECT ID, SENHA, NOME FROM USUARIO WHERE ID = %s AND SENHA = %s"
        result = PostgresConnection.select(query, codigo, senha)
        if result:
            return jsonify({"success": "Dados de login corretos.", "result": {"nome" : result[0][2]}}), 200
        else:
            return jsonify({"error": "Código ou senha incorretos."}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
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