from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2 import Error
from animal import animal_cadastro, animal_consulta, animal_detalhes, animal_for_combo

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
    return jsonify({"success": "Conectou"}), 200
    

if __name__ == '__main__':
    app.run(debug=True)