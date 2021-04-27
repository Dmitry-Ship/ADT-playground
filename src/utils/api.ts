import { IEither, Left, Right } from "../monads/either";

export const makeAPICall = async <T>(
  url: string
): Promise<IEither<Error, T>> => {
  let result: Response;

  try {
    result = await fetch("https://" + url);
  } catch (error) {
    return Left(error);
  }

  try {
    const parsed = await result.json();

    return Right(parsed);
  } catch (error) {
    return Left(error);
  }
};
