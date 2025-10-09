export const unWrap = async <T>(promise: Promise<{ data: { data: T } }>): Promise<T> => {
  const res = await promise
  return res.data.data
}
