export type NavItem = {
  title: string
  url: string
  child?: NavItem[]
}

export interface SortOption<T> {
  field: keyof T
  order: 'asc' | 'desc'
}

export interface SearchOption<T> {
  searchTerm: string
  keysToSearch: (keyof T)[]
}
export interface UpdateType<T> {
  newData: Omit<T, 'id'>
  id: string
}
