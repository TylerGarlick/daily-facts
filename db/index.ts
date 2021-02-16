// @ts-ignore
import Datastore from 'nedb-promises'
import { join } from 'path'

export const initialize = (options: { filename?: string; inMemoryOnly: boolean }) =>
  Datastore.create({
    ...options,
    autoload: true,
    timestampData: true,
  })

export const filename = join(__dirname, 'facts.db')
