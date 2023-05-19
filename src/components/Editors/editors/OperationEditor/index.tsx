import CodeEditor from '@uiw/react-textarea-code-editor';
import { operationPlaceholder } from 'assets';
import styles from './OperationEditor.module.scss';

interface OperationEditorProps {
  value: string;
  onOperationChange: (value: string) => void;
}

export const OperationEditor = ({ value, onOperationChange }: OperationEditorProps) => {
  return (
    <div className={styles.operationEditor}>
      <CodeEditor
        className={styles.operationCode}
        value={value}
        language="graphql"
        placeholder={operationPlaceholder}
        onChange={(e) => onOperationChange(e.target.value)}
      />
    </div>
  );
};
