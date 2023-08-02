export type PaginatedData<T> = {
    page: number,
    pageSize: number,
    itemsTotalCount: number,
    pagesTotalCount: number,
    data: T[],
}