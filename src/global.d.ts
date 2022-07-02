type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Valueless<T> = T | undefined | null;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
