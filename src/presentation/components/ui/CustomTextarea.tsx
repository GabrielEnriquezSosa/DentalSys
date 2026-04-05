import React, { useState, forwardRef } from "react";

export interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

export const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ maxLength, onInput, className, ...props }, ref) => {
    const [length, setLength] = useState(
      props.value ? String(props.value).length : (props.defaultValue ? String(props.defaultValue).length : 0)
    );

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (onInput) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInput(e as any);
      }
      setLength(e.currentTarget.value.length);
    };

    return (
      <div className="relative w-full h-full flex flex-col">
        <textarea
          ref={ref}
          maxLength={maxLength}
          onInput={handleInput}
          className={className}
          {...props}
        />
        {maxLength && (
          <div className="absolute right-3 -bottom-[18px] text-[10px] font-semibold text-slate-400 z-10 pointer-events-none">
            {length} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);
CustomTextarea.displayName = "CustomTextarea";
