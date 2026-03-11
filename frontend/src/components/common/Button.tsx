import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'btn',
          {
            'btn-primary': variant === 'primary',
            'btn-disabled': disabled || isLoading,
          },
          className
        )}
        {...props}
      >
        {isLoading ? <span className="opacity-70">جاري التحميل...</span> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
