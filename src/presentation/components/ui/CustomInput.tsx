import React, { useState, forwardRef } from "react";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ maxLength, onInput, className, ...props }, ref) => {
    const [length, setLength] = useState(
      props.value ? String(props.value).length : (props.defaultValue ? String(props.defaultValue).length : 0)
    );

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      if (onInput) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInput(e as any);
      }
      setLength(e.currentTarget.value.length);
    };

    return (
      <div className="relative w-full h-full">
        <input
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
CustomInput.displayName = "CustomInput";
