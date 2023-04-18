import { Nationality } from './Nationality'

interface IListDTO {
  pageStart: number
  pageEnd: number
}

interface ICreateDTO {
  name: string
  img_path: string
}

const data: Nationality[] = [
  {
    id: '1f7353e2-c6c2-409b-9bbd-b7ec1acc0104',
    name: 'Brasil',
    img_path: 'https:www.imagens.com.br',
  },

  {
    id: '38fc123f-9c71-46ee-8b0b-164e370af41d',
    name: 'Alemanha',
    img_path: 'https:www.imagens.com.br',
  },

  {
    id: '38fc123f-9c71-46ee-8b0b-164e370af41a',
    name: 'Itália',
    img_path: 'https:www.imagens.com.br',
  },

  {
    id: 'a55948be-4b0e-44a0-a879-0868faaab694',
    name: 'Estados Unidos',
    img_path: 'https:www.imagens.com.br',
  },
]

class NationalitiesRepository {
  private nationalities: Nationality[]

  private static INSTANCE: NationalitiesRepository

  private constructor() {
    this.nationalities = data
  }

  public static getInstance(): NationalitiesRepository {
    if (!NationalitiesRepository.INSTANCE) {
      NationalitiesRepository.INSTANCE = new NationalitiesRepository()
    }

    return NationalitiesRepository.INSTANCE
  }

  findById(id: string): Nationality | undefined {
    return this.nationalities.find((nationality) => nationality.id === id)
  }

  findByName(name: string): Nationality | undefined {
    return this.nationalities.find((nationality) => nationality.name === name)
  }

  list({ pageStart, pageEnd }: IListDTO): Nationality[] {
    return this.nationalities.slice(pageStart, pageEnd)
  }

  getNumberOfRegisters(): Number {
    return this.nationalities.length
  }

  create({ name, img_path }: ICreateDTO): void {
    const nationality = new Nationality()

    Object.assign(nationality, { name, img_path })

    this.nationalities.push(nationality)
  }

  delete(id: string): void {
    const index = this.nationalities.findIndex(
      (nationality) => nationality.id === id,
    )

    this.nationalities.splice(index, 1)
  }
}

export { NationalitiesRepository }
