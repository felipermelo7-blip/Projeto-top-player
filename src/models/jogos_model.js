import db from "../config/db.js"

export const listar = async () => {
  const [rows] = await db.query("SELECT * FROM jogos")
  return rows
}

export const buscarPorId = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM jogos WHERE id = ?",
    [id]
  )
  return rows[0]
}

export const criar = async (nome, genero) => {
  const [result] = await db.query(
    "INSERT INTO jogos (nome, genero) VALUES (?, ?)",
    [nome, genero]
  )

  return { id: result.insertId, nome, genero }
}

export const atualizar = async (id, nome, genero) => {
  await db.query(
    "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?",
    [nome, genero, id]
  )
}

export const deletar = async (id) => {
  await db.query(
    "DELETE FROM jogos WHERE id = ?",
    [id]
  )
}