from datetime import datetime, timezone

from sqlalchemy import PrimaryKeyConstraint, UniqueConstraint
from app import db

class Cupom(db.Model):
    __tablename__ = 'cupom'

    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(8), nullable=False)
    escola_id = db.Column(db.Integer, db.ForeignKey('escola.id', name='fk_cupom_escola'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id', name='fk_cupom_animal'), nullable=False)
    data_validade = db.Column(db.DateTime(timezone=False), server_default=db.text("NOW() + INTERVAL '7 days'"))
    ativo = db.Column(db.Boolean, default=True, nullable=False)
    data_cadastro = db.Column(db.DateTime(timezone=False), server_default=db.text('CURRENT_TIMESTAMP'))

    __table_args__ = (
        PrimaryKeyConstraint('id', name='pk_cupom'),
        UniqueConstraint('codigo', name='ck_codigo_unico'),
    )