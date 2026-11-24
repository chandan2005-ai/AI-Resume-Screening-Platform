import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'; size?: 'sm' | 'md' | 'lg'; loading?: boolean; block?: boolean; children: ReactNode };

export function Button({ variant = 'primary', size = 'md', loading = false, block = false, children, className = '', disabled, ...props }: Props) {
  return <button className={`btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`} disabled={disabled || loading} {...props}>
    {loading && <LoaderCircle size={16} className="spin" />}{children}
  </button>;
}
