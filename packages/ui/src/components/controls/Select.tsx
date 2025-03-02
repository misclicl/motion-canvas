import styles from './Controls.module.scss';
import clsx from 'clsx';

export interface SelectProps<T> {
  title?: string;
  options: {value: T; text: string}[];
  className?: string;
  main?: boolean;
  value: T;
  onChange: (value: T) => void;
}

export function Select<T>({
  options,
  value,
  onChange,
  title,
  main,
  className,
}: SelectProps<T>) {
  return (
    <select
      title={title}
      className={clsx(styles.select, className, main && styles.main)}
      value={options.findIndex(option => option.value === value)}
      onChange={event =>
        onChange(
          options[parseInt((event.target as HTMLSelectElement).value)].value,
        )
      }
    >
      {options.map((option, index) => (
        <option key={option.value} value={index}>
          {option.text}
        </option>
      ))}
    </select>
  );
}
