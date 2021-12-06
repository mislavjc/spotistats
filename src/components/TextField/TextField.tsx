import { FunctionComponent } from 'react';

import styles from './TextField.module.scss';

interface Props {
  value: string | number;
  onChange: (value: any) => void;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  gutterBottom?: boolean;
  type?: 'text' | 'number';
  disabled?: boolean;
}

const TextField: FunctionComponent<Props> = ({
  value,
  onChange,
  placeholder,
  error = false,
  fullWidth = false,
  gutterBottom = false,
  type = 'text',
  disabled = false,
}) => (
  <span className={styles.input}>
    <input
      className={`${styles.input__field} ${fullWidth ? styles.input__field_fullWidth : undefined} ${
        gutterBottom ? styles.input__field_gutterBottom : undefined
      } ${error ? styles.input__field_error : undefined} ${
        disabled ? styles.input__field_disabled : undefined
      }`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  </span>
);

export default TextField;
