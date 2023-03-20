import { Category } from "./Category"


interface ICreateDTO {
  name: string
  parent_id: string | undefined
}

interface IUpdateDTO {
  id: string
  name: string
  parent_id: string | undefined
}

interface IListDTO {
  pageStart: number
  pageEnd: number
}

class CategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository 

  private constructor() {
    this.categories = [
      { id: 'df327cf7-0a41-4c36-be6b-cd8245d5f566', name: 'Rápidos', parent_id: undefined},
      { id: '5fc56cdf-73f3-40c4-86ad-92af5da53f73', name: 'Massas', parent_id: undefined},
      { id: '6aa5bc33-6380-4dc9-8ac1-36ad514e8256', name: 'Carnes', parent_id: undefined},
      { id: 'e9f90064-6bc7-4e1d-96e9-d6f727e79bd4', name: 'Saladas', parent_id: undefined},
      { id: 'a89bb361-d957-4cd7-ba43-b327d48f87f4', name: 'Sobremesas', parent_id: undefined},
      { id: '8499eb8f-2cd2-45dd-ab2d-8e0ccc505e0c', name: 'Bebidas', parent_id: undefined},
      { id: '9d6d907a-31b1-4473-a4f6-f1a5abb65cd3', name: 'Sem lactose', parent_id: undefined},
      { id: '2e8bce91-18e5-4fb9-a950-3c9e3992e037', name: 'Sem glúten', parent_id: undefined},
      { id: '8efe7e19-c002-4ff1-b89e-29e112d45c38', name: 'Registro de teste numero 1', parent_id: undefined },
      { id: '1c7fde23-74ae-4491-b1c7-71c4a9f47707', name: 'Registro de teste numero 2', parent_id: undefined },
      { id: '3e1f2f20-d213-4c17-9dde-e153d83fe53f', name: 'Registro de teste numero 3', parent_id: undefined },
      { id: '4da84c90-4c2f-4e4f-b786-04fcc6a29ec6', name: 'Registro de teste numero 4', parent_id: undefined },
      { id: '90567047-0891-4214-b5ba-bb9645f46b5e', name: 'Registro de teste numero 5', parent_id: undefined },
      { id: '6bebf46a-be3f-41f2-840a-b9cf164e97c9', name: 'Registro de teste numero 6', parent_id: undefined },
      { id: '12f8e3eb-a708-4afa-939e-fbec86386875', name: 'Registro de teste numero 7', parent_id: undefined },
      { id: '1448a233-1879-42ec-ab14-23944e84b242', name: 'Registro de teste numero 8', parent_id: undefined },
      { id: '62fd0839-ee81-43de-bb83-4f5961c54e8c', name: 'Registro de teste numero 9', parent_id: undefined },
      { id: '96e74caa-ff7b-4c14-b192-ec6b35fd7e73', name: 'Registro de teste numero 10', parent_id: undefined },
      { id: '8e619d08-776f-443a-833f-cd022a937986', name: 'Registro de teste numero 11', parent_id: undefined },
      { id: '8c6e157c-3852-4c97-9458-b07a74ccddbb', name: 'Registro de teste numero 12', parent_id: undefined },
      { id: '5fa14191-2c4e-4027-b4ec-84a702a98c62', name: 'Registro de teste numero 13', parent_id: undefined },
      { id: 'e7a26114-a7b0-4334-b9ea-7b7bc650db52', name: 'Registro de teste numero 14', parent_id: undefined },
      { id: 'd697a251-290b-4b14-b623-4911ddb866ec', name: 'Registro de teste numero 15', parent_id: undefined },
      { id: '6adb1ea8-3495-48a7-818f-5de37f928c71', name: 'Registro de teste numero 16', parent_id: undefined },
      { id: '9262a671-d819-44c7-bd9a-5b0a1538d522', name: 'Registro de teste numero 17', parent_id: undefined },
      { id: '7a9a2813-6f79-4afa-b381-582e722d1c04', name: 'Registro de teste numero 18', parent_id: undefined },
      { id: '3bc3ec30-762b-455e-970a-ae1224419d70', name: 'Registro de teste numero 19', parent_id: undefined },
      { id: 'aa75419c-af5a-488e-b88c-ab4fd0656b8d', name: 'Registro de teste numero 20', parent_id: undefined },
      { id: '6a91d08f-245d-48f6-ba6a-55148e534a55', name: 'Registro de teste numero 21', parent_id: undefined },
      { id: '5b1ce1ba-2a77-43c7-8dfd-d817e179e051', name: 'Registro de teste numero 22', parent_id: undefined },
      { id: 'eaf8e174-0881-4fb8-afc7-142f43ea40a1', name: 'Registro de teste numero 23', parent_id: undefined },
      { id: 'edce1f2f-b30d-4d92-a0c1-b0792b3ea899', name: 'Registro de teste numero 24', parent_id: undefined },
      { id: '5aaf8705-f324-424b-b03a-8f3ee90104a4', name: 'Registro de teste numero 25', parent_id: undefined },
      { id: '1ba8ffdc-f54a-4b98-8a4a-fbc6407b2eda', name: 'Registro de teste numero 26', parent_id: undefined },
      { id: '954d6064-0298-4f4e-82dd-ce93e2b1eac6', name: 'Registro de teste numero 27', parent_id: undefined },
      { id: 'cd8fd61f-339a-4f5f-b5e8-6b6299bd7bed', name: 'Registro de teste numero 28', parent_id: undefined },
      { id: '368c2788-edac-4faa-beb0-95fd1725afd9', name: 'Registro de teste numero 29', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8637-ca717f75685b', name: 'Registro de teste numero 30', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8317-ca717f7568cc', name: 'Registro de teste numero 31', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8237-ca717f75681e', name: 'Registro de teste numero 32', parent_id: undefined },
      { id: '368c2788-edac-4faa-bqb0-95fd1725afd9', name: 'Registro de teste numero 33', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8e37-ca717f75685b', name: 'Registro de teste numero 34', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8b37-ca717f7568cc', name: 'Registro de teste numero 35', parent_id: undefined },
      { id: '16b631c2-8f70-42cc-8a37-ca717f75681e', name: 'Registro de teste numero 36', parent_id: undefined },
    ]
  }

  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE){
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }
  
  findById(id: string): Category | undefined {
    return this.categories.find((category) => category.id === id)
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name)
  }

  list({pageStart, pageEnd}: IListDTO):Category[] {
    return this.categories.slice(pageStart, pageEnd)
  }

  getNumberOfRegisters():Number {
    return this.categories.length
  }

  create({name, parent_id}: ICreateDTO): void {
    const category = new Category()

    Object.assign(category, {name, parent_id})

    this.categories.push(category)
  }

  update({ id, name, parent_id }: IUpdateDTO): Category {
    const index = this.categories.findIndex((category) => category.id === id)

    const data = {id, name, parent_id}

    this.categories[index] = data

    return data
  }

  delete(id: string): void {
    const index = this.categories.findIndex((category) => category.id === id)

    this.categories.splice(index, 1)
  }


  
  

}



export {CategoriesRepository}