from datetime import datetime, timezone

from sqlalchemy import PrimaryKeyConstraint
from app import db

class Escola(db.Model):
    __tablename__ = 'escola'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(250), nullable=False)
    endereco = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250))
    celular = db.Column(db.String(30))
    data_cadastro = db.Column(db.DateTime(timezone=False), server_default=db.text('CURRENT_TIMESTAMP'))
    ativo = db.Column(db.Boolean, default=True, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('id', name='pk_escola'),
    )