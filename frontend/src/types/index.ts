import React from "react";

export type ModalProps<T> = {
  data: T;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};
