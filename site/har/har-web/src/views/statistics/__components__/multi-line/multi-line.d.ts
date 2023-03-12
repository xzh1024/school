export type MultiLineType = {
  total1?: number;
  total2?: number;
  title?: { [key: string]: any } | { [key: string]: any }[];
  grid?: {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
  xData: string[];
  series: Array<{
    name: string;
    data: Array<number | string>;
    type?: string;
    barWidth?: number;
  }>;
};
