import { toast } from "@/components/ui/use-toast";
import { ErrorData } from "@/types/queries";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<F extends (...args: string[]) => unknown>(
  func: F,
  timeout: number
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const showSuccess = (message: string) => {
  return toast({
    description: message,
    variant: "success",
  });
};

export const showError = (message: string) => {
  return toast({
    description: message,
    variant: "destructive",
  });
};

export const displayQueryError = (errorData: AxiosError<ErrorData>) => {
  const { message, validationErrors } = errorData.response?.data || {};

  let errorMsg: string = "";

  if (validationErrors) {
    if (typeof validationErrors === "string") {
      errorMsg = validationErrors;
    } else if (Array.isArray(validationErrors)) {
      if (typeof validationErrors[0] === "string") {
        [errorMsg] = validationErrors;
      } else if ("description" in validationErrors[0]) {
        errorMsg = validationErrors[0].description;
      }
    }
  } else {
    errorMsg = message as string;
  }

  toast({
    variant: "destructive",
    description: errorMsg,
  });
};

export const formatAmount = (amount: number, shortFrom?: boolean) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const res = currency.format(amount);

  if (shortFrom) {
    return res;
  } else {
    const formattedCurrency = res.replace("NGN", "₦");

    return formattedCurrency;
  }
};

export const convertImageFile = (file: File): FormData => {
  const formData = new FormData();

  formData.append("image", file);

  return formData;
};

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
