import styles from './OperationEditor.module.scss';

interface OperationEditorProps {
  value: string;
  onOperationChange: (value: string) => void;
}

export const OperationEditor = ({ value, onOperationChange }: OperationEditorProps) => {
  return (
    <div className={styles.operationEditor}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => onOperationChange(e.target.value)}
      ></textarea>
    </div>
  );
};