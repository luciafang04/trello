'use client';

import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Button } from './button';

export const Dialog = RadixDialog.Root;

export const DialogTrigger: React.FC<{ asChild?: boolean; children: React.ReactNode }> = ({ children, asChild }) => {
  return <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>;
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <RadixDialog.Portal>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <RadixDialog.Content
        className={`fixed top-1/2 left-1/2 max-w-lg w-full p-6 bg-white rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 focus:outline-none ${className ?? ''}`}
        {...props}
      >
        {children}
        <RadixDialog.Close asChild>
          <Button className="absolute top-3 right-3">X</Button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RadixDialog.Title className="text-lg font-bold">{children}</RadixDialog.Title>;
};

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};
