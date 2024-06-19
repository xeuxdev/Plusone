import { AxiosError } from "axios";

export type QueryResponse<T> = {
  message: string;
  status: number;
  data: T;
};

interface ErrorData {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
}

export type QueryError = AxiosError<ErrorData>;
