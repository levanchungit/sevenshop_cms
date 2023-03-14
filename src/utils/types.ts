export type Maybe<T> = T | null | undefined;

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types
export type Preserve<T, U> = T extends U ? U : never;

// Extract<T, U> — Extract from T those types that are assignable to U.
export type Optionals<T> = Extract<T, null | undefined>;

export type Defined<T> = T extends undefined ? never : T;

export type NotNull<T> = T extends null ? never : T;

export type Thunk<T> = T | (() => T);

export type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

// this seems to force TS to show the full type instead of all the wrapped generics
export type _<T> = T extends {} ? { [k in keyof T]: T[k] } : T; // eslint-disable-line @typescript-eslint/ban-types

export type Concat<T, U> = NonNullable<T> & NonNullable<U> extends never
  ? never
  : (NonNullable<T> & NonNullable<U>) | Optionals<U>;
