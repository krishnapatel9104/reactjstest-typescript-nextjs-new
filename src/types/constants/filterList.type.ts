export interface filterListType {
  id: number
  value: string
  isChecked: boolean
}

export interface sizeFilterListType {
  id: number
  value: string
  name: string
  isChecked: boolean
}

export interface allFilterListType {
  mainFilter: Array<string>
  brandFitler: Array<string>
  categoryFilter: Array<string>
  sizeFilter: Array<string>
  priceFilters: [number, number]
}