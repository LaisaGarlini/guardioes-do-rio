from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

from models import animal, cupom_resgatado, cupom, escola, usuario
from app import db

# Configurações do Alembic
config = context.config

# Configuração de log
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Defina o target_metadata para incluir os metadados dos modelos
target_metadata = db.Model.metadata

def run_migrations_offline() -> None:
    """Executa migrações no modo offline."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Executa migrações no modo online."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()