export function percentageDiference(a: number, b: number):{less: boolean, result: string} {
  const result = (Math.abs((a-b)/((a+b)/2))*100).toFixed(4)
  if (a > b) return {less: false, result}
  return {less: true, result}
}
