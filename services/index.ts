// @ts-ignore
import Datastore from 'nedb-promises'
import Facts, { FactsService } from './facts'

export default (db: Datastore) => {
  return {
    facts: Facts(db) as FactsService,
  }
}
