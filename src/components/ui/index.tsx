import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger', isLoading?: boolean }>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md',
      secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600',
      ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
      danger: 'bg-red-900/50 hover:bg-red-800/50 text-red-200 border border-red-900',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300',
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';

export const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 shadow-sm", className)}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);

export const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={cn("text-2xl font-serif font-semibold leading-none tracking-tight text-emerald-500", className)}>{children}</h3>
);

export const CardContent = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);
