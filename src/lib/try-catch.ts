/**
 * The `tryCatch` function is a TypeScript wrapper that executes a promise and returns a `Result` type
 * indicating success with data or failure with an error.
 * @param promise - The `promise` parameter in the `tryCatch` function is a Promise that resolves to a
 * value of type `T`. The function wraps this Promise and handles both successful and failed outcomes,
 * returning a `Result` type that can represent either a successful result (`Success<T>`) containing
 * the data of
 * @returns The `tryCatch` function returns a Promise that resolves to a `Result` object. This `Result`
 * object can either be a `Success` object containing the data if the promise resolves successfully, or
 * a `Failure` object containing the error if the promise rejects.
 */
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
