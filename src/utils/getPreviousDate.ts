export const getPreviousDate = (day: number): Date => {
  const date = new Date()
  return new Date(date.getTime() - (day * 24 * 60 * 60 * 1000))
}
