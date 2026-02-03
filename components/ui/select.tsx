// components/ui/select.tsx
'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';

// Variantes de estilo
const selectVariants = cva(
  "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full",
  {
    variants: {
      variant: { default: "border-gray-300", error: "border-red-500" },
      selectSize: { default: "h-10", sm: "h-8 text-sm px-2", lg: "h-12 text-lg px-4" },
    },
    defaultVariants: { variant: "default", selectSize: "default" },
  }
);

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  variant?: 'default' | 'error';
  selectSize?: 'default' | 'sm' | 'lg';
};

// Componente principal Select
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = 'default', selectSize = 'default', className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={selectVariants({ variant, selectSize, className })}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

// Subcomponentes estilo Shadcn
export const SelectTrigger = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

export const SelectContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props}>{children}</div>;
};

export const SelectItem = ({ children, value, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) => {
  return (
    <div role="option" data-value={value} {...props}>
      {children}
    </div>
  );
};

// 🔹 Aquí está SelectValue (subcomponente, no archivo separado)
interface SelectValueProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ children, placeholder, ...props }) => {
  return <div {...props}>{children ?? placeholder}</div>;
};
