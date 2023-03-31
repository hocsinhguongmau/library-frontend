export const filterArrayBySearchTerm = <T>(
  array: T[],
  searchTerm: string,
  keysToSearch: (keyof T)[]
): T[] => {
  return array.filter((item) => {
    for (const key of keysToSearch) {
      const value = item[key]
      if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        return true
      }
    }
    return false
  })
}

type OrderType = 'asc' | 'desc'
export const sortArrayByField = <T, K extends keyof T>(data: T[], sortBy: K, order: OrderType) => {
  return data.sort((a, b) => {
    const aValue = String(a[sortBy]).toLowerCase()
    const bValue = String(b[sortBy]).toLowerCase()
    if (aValue === undefined || aValue === null) {
      return order === 'asc' ? -1 : 1
    } else if (bValue === undefined || bValue === null) {
      return order === 'asc' ? 1 : -1
    } else if (aValue < bValue) {
      return order === 'asc' ? -1 : 1
    } else if (aValue > bValue) {
      return order === 'asc' ? 1 : -1
    } else {
      return 0
    }
  })
}

export const formatPublishedDate = (date: Date | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
