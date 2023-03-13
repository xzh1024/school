export const fmt = {
  second: "YYYY-MM-DD HH:mm:ss",
  minute: "YYYY-MM-DD HH:mm",
  hour: "YYYY-MM-DD HH",
  day: "YYYY-MM-DD",
  month: "YYYY-MM",
  year: "YYYY"
};

export function getColumnsIndex(arr: string[], value: number) {
  return arr.findIndex((it) => parseInt(it) === value);
}
