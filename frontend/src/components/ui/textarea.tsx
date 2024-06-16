import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({
  className,
  maxLength,
  ...props
}) => {
  const [charLength, setCharLength] = React.useState(0);
  const ref = React.useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  React.useEffect(() => {
    function autoResize() {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }

    autoResize();
    window.addEventListener("DOMContentLoaded", autoResize);

    return () => {
      window.removeEventListener("DOMContentLoaded", autoResize);
    };
  }, [charLength]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueLength = event.target.value.length;
    setCharLength(valueLength);
  };

  return (
    <div className="relative">
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        maxLength={maxLength}
        onInput={handleInput}
        ref={ref}
        {...props}
      />
      <span className="absolute text-xs right-1 -top-6">
        {charLength} / {maxLength}
      </span>
    </div>
  );
};
Textarea.displayName = "Textarea";

export { Textarea };
