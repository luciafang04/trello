'use client';

import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '../../lib/utils';

// El Root del Select
export const Select = RadixSelect.Root;

// Trigger (el botón que abre el dropdown)
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  RadixSelect.SelectTriggerProps & { className?: string }
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      'flex items-center justify-between px-3 py-2 border rounded-md bg-white text-sm',
      'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
      className
    )}
    {...props}
  >
    {children}
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

// Value (muestra la opción seleccionada o placeholder)
export const SelectValue = RadixSelect.Value;

// Contenido del dropdown
export const SelectContent = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectContentProps & { className?: string }
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        'bg-white border rounded-md shadow-md w-[200px] overflow-hidden',
        className
      )}
      {...props}
    >
      <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = 'SelectContent';

// Cada opción
export const SelectItem = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectItemProps & { className?: string }
>(({ children, className, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'px-3 py-2 cursor-pointer hover:bg-gray-200 relative select-none text-sm',
      className
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = 'SelectItem';
