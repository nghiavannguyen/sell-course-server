// pagination-result.interface.ts
export interface PaginationResult<T> {
    data: T[]; // Dữ liệu của trang hiện tại
    meta: {
      total: number; // Tổng số bản ghi
      page: number; // Trang hiện tại
      limit: number; // Số bản ghi mỗi trang
      totalPages: number; // Tổng số trang
    };
  }