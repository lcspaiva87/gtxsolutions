export interface ErrorResult {
  type: "error";
  message: string;
}

export interface SuccessResult {
  type: "success";
  data: any;
}

export type Result<T> = ErrorResult | SuccessResult;
