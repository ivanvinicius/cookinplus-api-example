import { v4 as uuid } from 'uuid'

class Nationality {
  id?: string
  name: string
  img_path: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Nationality }
