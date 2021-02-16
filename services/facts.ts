import Datastore = require('nedb-promises')
import { Fact, FactEntity } from '../types'
import { validate, ValidationError } from 'class-validator'

export interface FactsService {
  all(query?: Partial<Fact>): Promise<FactEntity[]>

  findByDate(date: Date): Promise<FactEntity[]>

  findByMonthAndDay(month: number, day: number): Promise<FactEntity[]>

  insert(entities: Fact | Fact[]): Promise<FactEntity | FactEntity[]>

  upsert(query: {}, updateQuery: Partial<FactEntity> | any)

  validate(entity: Fact | FactEntity): Promise<ValidationError[]>

  isValid(entity: Fact | FactEntity): Promise<boolean>
}

export default (db: Datastore) => {
  return {
    async all(query?: Partial<Fact>): Promise<FactEntity[]> {
      return ((await db.find({ ...query, active: true }).exec()) as unknown) as FactEntity[]
    },

    async findByDate(date: Date): Promise<FactEntity[]> {
      const day = date.getDate()
      const month = date.getMonth()
      return this.findByMonthAndDay(month, day)
    },

    async findByMonthAndDay(month: number, day: number): Promise<FactEntity[]> {
      const facts = await db.find({ day, month, active: true }).exec()
      return (facts as unknown) as FactEntity[]
    },

    async insert(entities: Fact | Fact[]): Promise<FactEntity | FactEntity[]> {
      return await db.insert(entities)
    },

    async upsert(query: Partial<FactEntity> | any, updateQuery: Partial<FactEntity> | any) {
      return ((await db.update(query, updateQuery, { upsert: true, multi: false, returnUpdatedDocs: true })) as unknown) as FactEntity
    },

    async remove(query: Partial<FactEntity> | any) {
      return db.remove(query, { multi: false })
    },
    async validate(entity: Fact | FactEntity): Promise<ValidationError[]> {
      return validate(entity, { forbidUnknownValues: true })
    },
    async isValid(entity: Fact | FactEntity): Promise<boolean> {
      const errors = ((await this.validate(entity)) as unknown) as ValidationError[]
      return errors.length === 0
    },
  } as FactsService
}
