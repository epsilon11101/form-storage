export const unWrap = async <T>(promise: Promise<{ data: { data: T } }>): Promise<T> => {
  const res = await promise
  return res.data.data
}

export const unWrapWithData = async <T>(promise: Promise<{ data: T }>): Promise<T> => {
  const res = await promise
  return res.data
}
