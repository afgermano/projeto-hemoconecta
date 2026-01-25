from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="HemoConecta API")

doadores = []

class Doador(BaseModel):
    nome: str
    tipo_sanguineo: str
    cidade: str

@app.get("/")
def home():
    return {"status": "HemoConecta API rodando"}

@app.get("/doadores")
def listar_doadores():
    return doadores

@app.post("/doadores")
def cadastrar_doador(doador: Doador):
    novo_doador = doador.dict()
    novo_doador["id"] = len(doadores) + 1
    doadores.append(novo_doador)
    return novo_doador