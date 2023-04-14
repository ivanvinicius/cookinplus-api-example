import { v4 as uuid } from 'uuid'

class Category {
  id?: string
  name: string
  parent_id: string | undefined

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Category }
