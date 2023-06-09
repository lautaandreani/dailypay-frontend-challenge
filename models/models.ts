export type Item = {
  title: string
  photoUrL: string
  id: string
}

export type Category = {
  id: string
  items: Item[]
  title: string
}

export type Data = {
  items: Category[]
}

export interface SelectNominee {
  category: string
  nominee: Item
}

export type SelectBallot = SelectNominee[]
