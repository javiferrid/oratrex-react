export const formatString = (string: string): string => {
  const arr = string.split(' ')
  let result = ''

  arr.every(word => {
    if (result.length < 22) result += word.concat(' ')
    else {
      result += '...'
      return false
    }
    return true
  })
  return result
}
