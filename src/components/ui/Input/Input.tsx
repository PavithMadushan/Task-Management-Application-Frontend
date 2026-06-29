import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...rest }: InputProps) => (
  <div className={styles.wrapper}>
    {label && <label className={styles.label}>{label}</label>}
    <input className={styles.input} {...rest} />
    {error && <p className={styles.error}>{error}</p>}
  </div>
);