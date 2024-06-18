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

export const notify = (message: string) => {
  return toast({
    description: message,
    variant: "default",
  });
};

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

export const formatDate = (iso: string) => {
  const date = new Date(iso);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date.getTime());
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const year = date.getFullYear();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();

  if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  } else if (days < 365) {
    return `${month} ${day}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
};

export function getFirstH1Content(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let text = "";

  const firstH1 = doc.querySelector("h1.font-bold");

  if (!firstH1) {
    return text;
  } else {
    text = firstH1.textContent || "";
  }

  return text;
}

export function stripFirstH1(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const firstH1 = doc.querySelector("h1.font-bold");

  if (firstH1) {
    firstH1?.parentNode?.removeChild(firstH1);
  }
  return doc.body.innerHTML;
}

export function getFirstImageUrl(htmlString: string) {
  const regex = /<img.*?src="([^"]+)"/;
  const match = regex.exec(htmlString);

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export function stripFirstImg(htmlString: string) {
  const regex = /<img.*?>/; // Matches the first img tag (any attributes)
  return htmlString.replace(regex, "");
}

export function convertToPlainText(htmlString: string) {
  const textNode = document.createElement("div");
  textNode.innerHTML = htmlString;
  let text = "";

  if (textNode) {
    text = `${textNode.textContent?.trim()}`;
  }
  return text;
}
