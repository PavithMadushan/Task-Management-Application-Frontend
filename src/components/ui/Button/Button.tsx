import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export const Button = ({ children, variant = 'primary', ...rest }: ButtonProps) => (
  <button className={`${styles.button} ${styles[variant]}`} {...rest}>
    {children}
  </button>
);