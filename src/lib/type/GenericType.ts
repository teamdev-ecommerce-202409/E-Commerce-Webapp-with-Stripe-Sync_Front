export type PaginationInfoType<T> = {
  count: number;
  next: string;
  previous: string;
  average_rating?: number;
  is_ordered?: boolean;
  results: T[];
};
