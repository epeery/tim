export const Right = (x: any) => ({
  x,
  map: (f: any) => Right(f(x)),
  fold: (_: any, g: any) => g(x),
  chain: (f: any) => f(x),
  ap: (o: any) => x(o.x),
  inspect: () => `Right(${x})`
})

export const Left = (x: any) => ({
  x,
  map: (_: any) => Left(x),
  fold: (f: any, _: any) => f(x),
  chain: (_: any) => Left(x),
  ap: (_: any) => Left(x),
  inspect: () => `Left(${x})`
})

// eitherFromNullable :: a -> Either a
export const eitherFromNullable = (x: any) => (x !== null && x !== undefined) ? Right(x) : Left(null)

// eitherFromNullable :: Bool -> Either Bool
export const eitherFromBool = (x: boolean) => x ? Right(x) : Left(false)
