import { Nutritionist } from './Nutritionist'

interface IListDTO {
  pageStart: number
  pageEnd: number
}

interface ICreateDTO {
  img_path: string
  user_id: string
}

const data: Nutritionist[] = [
  {
    id: 'f32ade4b-493c-412b-b36b-3b479e99d7d6',
    img_path:
      'https://api.dicebear.com/6.x/adventurer/svg?seed=Miss%20kitty&flip=true&scale=140&backgroundType=gradientLinear&earringsProbability=100&skinColor=ecad80&backgroundColor=ffdfbf',
    user_id: 'f63ef996-8ae5-4955-88b0-4b401bdfb433',
    user: {
      id: 'f63ef996-8ae5-4955-88b0-4b401bdfb433',
      name: 'Nathana Miranda',
      email: 'nathana@cookinplus.team',
    },
  },
  {
    id: '20ac8f8e-cb2d-4323-93df-297ad13d9a2d',
    img_path:
      'https://api.dicebear.com/6.x/adventurer/svg?seed=Bubba&flip=true&scale=140&backgroundType=gradientLinear&earringsProbability=100&skinColor=ecad80&backgroundColor=ffdfbf',
    user_id: 'd959e1ca-2617-4688-ad79-744f62e5fcba',
    user: {
      id: 'd959e1ca-2617-4688-ad79-744f62e5fcba',
      name: 'Aline De Caprio',
      email: 'aline@cookinplus.team',
    },
  },
  {
    id: 'b58d32a2-465b-47e9-abff-d8781bcab07e',
    img_path:
      'https://api.dicebear.com/6.x/adventurer/svg?seed=Cali&flip=true&scale=140&backgroundType=gradientLinear&earringsProbability=100&skinColor=ecad80&backgroundColor=ffdfbf',
    user_id: '855ccf9b-1ef5-442e-918b-0c8776212cd8',
    user: {
      id: '855ccf9b-1ef5-442e-918b-0c8776212cd8',
      name: 'Zonta Junior',
      email: 'zonta@cookinplus.team',
    },
  },
]

class NutritionistsRepository {
  private nutritionists: Nutritionist[]

  private static INSTANCE: NutritionistsRepository

  private constructor() {
    this.nutritionists = data
  }

  public static getInstance(): NutritionistsRepository {
    if (!NutritionistsRepository.INSTANCE) {
      NutritionistsRepository.INSTANCE = new NutritionistsRepository()
    }

    return NutritionistsRepository.INSTANCE
  }

  getNumberOfRegisters(): Number {
    return this.nutritionists.length
  }

  list({ pageStart, pageEnd }: IListDTO): Nutritionist[] {
    return this.nutritionists.slice(pageStart, pageEnd)
  }

  findById(id: string): Nutritionist | undefined {
    return this.nutritionists.find((nutritionist) => nutritionist.id === id)
  }

  findByUserId(user_id: string): Nutritionist | undefined {
    return this.nutritionists.find(
      (nutritionist) => nutritionist.user_id === user_id,
    )
  }

  create({ img_path, user_id }: ICreateDTO): void {
    const nutritionist = new Nutritionist()

    const random = data.length + 100

    const user = {
      id: user_id,
      name: `Usuário Número ${random}`,
      email: `usuario${random}@cookinplus.team`,
    }

    Object.assign(nutritionist, { img_path, user_id, user })

    this.nutritionists.push(nutritionist)
  }

  delete(id: string): void {
    const index = this.nutritionists.findIndex(
      (nutritionist) => nutritionist.id === id,
    )

    this.nutritionists.splice(index, 1)
  }
}

export { NutritionistsRepository }
