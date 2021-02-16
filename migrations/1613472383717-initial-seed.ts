import { initialize, filename } from '../db'

const db = initialize({ inMemoryOnly: false, filename })

export const up = async (next) => {
  const facts = []

  await db.insert(facts)

  next()
}

export const down = async (next) => {
  await db.remove({}, { multi: true })

  next()
}
