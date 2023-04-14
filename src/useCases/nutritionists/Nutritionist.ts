import { v4 as uuid } from 'uuid'

export interface UserAsNutritionist {
  id: string
  name: string
  email: string
}

class Nutritionist {
  id?: string
  img_path: string
  user_id: string
  user: UserAsNutritionist

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Nutritionist }
