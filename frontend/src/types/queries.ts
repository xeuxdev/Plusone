export type QueryResponse<T> = {
  message: string;
  status: number;
  data: T;
};

export interface ErrorData {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
}
