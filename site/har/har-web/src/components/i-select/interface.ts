export type SelectValue =
  | string
  | number
  | Record<string, unknown>
  | (string | number | Record<string, unknown>)[];

export type SelectOptions = Array<Recordable & {
  value: SelectValue;
  label: string;
}>;
