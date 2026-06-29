import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const Card = ({ title, actions, children }: CardProps) => (
  <div className={styles.card}>
    {title && (
      <header className={styles.header}>
        <h3>{title}</h3>
        {actions}
      </header>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);