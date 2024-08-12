export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  message?: string;
  error: string;
  statusCode: number;
};
