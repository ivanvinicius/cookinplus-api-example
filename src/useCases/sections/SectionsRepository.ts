import { Section } from './Section'

interface IListDTO {
  pageStart: number
  pageEnd: number
}

interface ICreateDTO {
  name: string
}

const data: Section[] = [
  { id: 'df327cf7-0a41-4c36-be6b-cd8245d5f56a', name: 'Cobertura' },
  { id: '5fc56cdf-73f3-40c4-86ad-92af5da53f7b', name: 'Massa' },
  { id: '5ec56cdf-73f3-40c4-86ad-92af5da53f7c', name: 'Recheio' },
]

class SectionsRepository {
  private sections: Section[]

  private static INSTANCE: SectionsRepository

  private constructor() {
    this.sections = data
  }

  public static getInstance(): SectionsRepository {
    if (!SectionsRepository.INSTANCE) {
      SectionsRepository.INSTANCE = new SectionsRepository()
    }

    return SectionsRepository.INSTANCE
  }

  getNumberOfRegisters(): Number {
    return this.sections.length
  }

  list({ pageStart, pageEnd }: IListDTO): Section[] {
    return this.sections.slice(pageStart, pageEnd)
  }

  findById(id: string): Section | undefined {
    return this.sections.find((section) => section.id === id)
  }

  findByName(name: string): Section | undefined {
    return this.sections.find((section) => section.name === name)
  }

  create({ name }: ICreateDTO): void {
    const section = new Section()

    Object.assign(section, { name })

    this.sections.push(section)
  }

  delete(id: string): void {
    const index = this.sections.findIndex((section) => section.id === id)

    this.sections.splice(index, 1)
  }
}

export { SectionsRepository }
