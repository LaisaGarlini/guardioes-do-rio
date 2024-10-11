import psycopg2
from psycopg2 import Error
from flask import jsonify, request

class PostgresConnection:
    @classmethod
    def select(cls, query, *args):
        try:
            with psycopg2.connect(
                dbname='guardioes-do-rio',
                user='postgres',
                password='postgres',
                host='localhost',
                port='5432'
            ) as conn:
                with conn.cursor() as cur:
                    cur.execute(query, args)
                    result = cur.fetchall()
                    return result
        except psycopg2.Error as e:
            conn.rollback()
            error_message = f"Erro durante SELECT: {e.pgcode} - {e.pgerror}"
            raise Exception(error_message)

    @classmethod
    def insert(cls, table, cols, values):
        try:
            with psycopg2.connect(
                dbname='guardioes',
                user='postgres',
                password='postgres',
                host='localhost',
                port='5432'
            ) as conn:
                with conn.cursor() as cur:
                    query = f"INSERT INTO {table} ({cols}) VALUES ({values})"
                    cur.execute(query, values)
                    conn.commit()
                    return 'Dados inseridos com sucesso.'
        except psycopg2.Error as e:
            conn.rollback()
            error_message = f"Erro durante INSERT: {e}"
            raise Exception(error_message)

    @classmethod
    def delete(cls, table, condition):
        try:
            with psycopg2.connect(
                dbname='guardioes',
                user='postgres',
                password='postgres',
                host='localhost',
                port='5432'
            ) as conn:
                with conn.cursor() as cur:
                    query = f"DELETE FROM {table} WHERE {condition}"
                    cur.execute(query)
                    conn.commit()
                    return "Dados excluídos com sucesso."
        except psycopg2.IntegrityError as e:
            conn.rollback()
            error_message = f"Erro de integridade durante DELETE: {e}"
            raise Exception(error_message)
        except psycopg2.Error as e:
            conn.rollback()
            error_message = f"Erro durante DELETE: {e}"
            raise Exception(error_message)
            
    @classmethod
    def update(cls, table, set_clause, condition, *args):
        try:
            with psycopg2.connect(
                dbname='guardioes',
                user='postgres',
                password='postgres',
                host='localhost',
                port='5432'
            ) as conn:
                with conn.cursor() as cur:
                    query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
                    cur.execute(query, *args)
                    conn.commit()
                    return 'Dados atualizados com sucesso.'
        except psycopg2.Error as e:
            conn.rollback()
            error_message = f"Erro durante UPDATE: {e}"
            raise Exception(error_message)