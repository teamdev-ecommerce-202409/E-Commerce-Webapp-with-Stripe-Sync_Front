export type PaginationInfoType<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
