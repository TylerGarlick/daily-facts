import { IsAlphanumeric, IsBoolean, IsDate, IsDateString, IsEnum, IsOptional, Max, Min } from 'class-validator'

export enum Region {
  GLOBAL = `GLOBAL`,
  NATIONAL = `NATIONAL`,
  LOCAL = `LOCAL`,
  OTHER = `OTHER`,
}

export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

export interface EntityWithId {
  _id: string
}

export abstract class AbstractFact {
  @IsEnum(Region)
  region: Region = Region.OTHER

  @IsEnum(Month)
  month: Month = Month.JANUARY

  @Min(1)
  @Max(31)
  day: number

  @IsAlphanumeric()
  name: string

  @IsOptional()
  description?: string

  @IsOptional()
  uri?: string

  @IsDate()
  @IsDateString({ strict: false })
  beganAt?: Date = new Date()

  @IsOptional()
  origin?: string

  @IsBoolean()
  active: boolean = true
}

export class Fact extends AbstractFact {}

export abstract class FactEntity implements EntityWithId {
  _id: string
}
