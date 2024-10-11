from datetime import datetime, timezone

from sqlalchemy import PrimaryKeyConstraint, UniqueConstraint
from app import db

class Animal(db.Model):
    __tablename__ = 'animal'

    id = db.Column(db.Integer, primary_key=True)
    nome_comum = db.Column(db.String(150), nullable=False)
    nome_cientifico = db.Column(db.String(150), nullable=False)
    habitat = db.Column(db.String(150), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    data_cadastro = db.Column(db.DateTime(timezone=False), server_default=db.text('CURRENT_TIMESTAMP'))
    ativo = db.Column(db.Boolean, default=True, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id', name='pk_animal'),
        UniqueConstraint('nome_cientifico', name='ck_nome_cientifico_unico'),
    )