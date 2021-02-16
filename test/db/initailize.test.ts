import { initialize } from '../../db'
import Datastore = require('nedb-promises')

console.log(initialize)

describe(`initialize`, () => {
  let db: Datastore
  beforeEach(() => {
    db = initialize({ inMemoryOnly: true })
    expect(db).toBeDefined()
  })

  it(`setups properly`, async () => {})
})
