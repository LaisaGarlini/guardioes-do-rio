from datetime import datetime, timezone

from sqlalchemy import PrimaryKeyConstraint, UniqueConstraint, CheckConstraint
from app import db

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    data_nascimento = db.Column(db.DateTime(timezone=False))
    tipo = db.Column(db.SmallInteger, nullable=False, comment='1 = Administrador, 2 = Responsável, 3 = Aluno', default=3)
    data_cadastro = db.Column(db.DateTime(timezone=False), server_default=db.text('CURRENT_TIMESTAMP'))
    ativo = db.Column(db.Boolean, default=True, nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escola.id', name='fk_usuario_escola'))

    __table_args__ = (
        PrimaryKeyConstraint('id', name='pk_usuario'),
        UniqueConstraint('email', name='ck_email_unico'),
        CheckConstraint('tipo IN (1, 2, 3)', name='check_tipo'),
    )