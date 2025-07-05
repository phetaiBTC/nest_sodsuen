export interface IPagination {
  readonly total: number;
  readonly count: number;
  readonly limit: number;
  readonly currentPage: number;
  readonly totalPages: number;
}