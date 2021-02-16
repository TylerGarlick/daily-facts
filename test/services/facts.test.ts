import Services from '../../services'
import { initialize } from '../../db'
import { FactsService } from '../../services/facts'
import { Fact, FactEntity, Month } from '../../types'
import Datastore = require('nedb-promises')

describe(`FactsService`, () => {
  let db: Datastore
  let service: FactsService
  beforeEach(() => {
    db = initialize({ inMemoryOnly: true })
    expect(db).toBeDefined()
    const { facts } = Services(db)
    service = facts
    expect(service).toBeDefined()
  })

  it(`can insert a new fact`, async () => {
    const fact = {
      name: `Something`,
      description: `Something Description`,
      month: Month.FEBRUARY,
      day: 15,
      active: true,
    } as Fact

    const result = (await service.insert(fact)) as FactEntity
    expect(result._id).toBeDefined()

    const facts = await service.all()
    expect(facts.length).toBeGreaterThan(0)
  })

  it(`should get all of the facts`, async () => {
    const facts = await service.all()
    console.log(facts)
  })
})
