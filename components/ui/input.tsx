// components/ui/input.tsx
'use client';

import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full",
  {
    variants: {
      variant: {
        default: "border-gray-300",
        error: "border-red-500",
      },
      inputSize: { // <- renombrado
        default: "h-10",
        sm: "h-8 text-sm px-2",
        lg: "h-12 text-lg px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  variant?: 'default' | 'error';
  inputSize?: 'default' | 'sm' | 'lg'; // <- renombrado
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', inputSize = 'default', className, ...props }, ref) => {
    return <input ref={ref} className={inputVariants({ variant, inputSize, className })} {...props} />;
  }
);

Input.displayName = 'Input';
