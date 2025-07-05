import { IPagination } from "./pagination.interface";

export interface PaginationReponse<T>{
    data:T[];
    pagination:IPagination;
}