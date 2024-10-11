from datetime import datetime, timezone

from sqlalchemy import PrimaryKeyConstraint
from app import db

class CupomResgatado(db.Model):
    __tablename__ = 'cupom_resgatado'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id', name='fk_cupom_resgatado_usuario'), nullable=False)
    cupom_id = db.Column(db.Integer, db.ForeignKey('cupom.id', name='fk_cupom_resgatado_cupom'), nullable=False)
    data_resgate = db.Column(db.DateTime(timezone=False), server_default=db.text('CURRENT_TIMESTAMP'))

    __table_args__ = (
        PrimaryKeyConstraint('id', name='pk_cupom_resgatado'),
    )