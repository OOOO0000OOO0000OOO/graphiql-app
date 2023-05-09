import React, { useState } from 'react';
import { HeadersEditor, OperationEditor, VariablesEditor, Response } from './editors';
import { useLazyGetGraphQLQuery } from 'store/api';
import { parse } from 'utils';
import styles from './Editors.module.scss';

export const Editors = () => {
  const [operation, setOperation] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [parseError, setParseError] = useState('');

  const [getGraphQLQuery, graphQLResponse] = useLazyGetGraphQLQuery();
  const { data, error } = graphQLResponse;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedData = parse(variables, headers);

      getGraphQLQuery({
        query: operation,
        variables: parsedData.variables,
        headers: parsedData.headers,
      });

      setParseError('');
    } catch (error) {
      if (error instanceof Error) setParseError(error.message);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
      <div className={styles.editorWrapper}>
        <OperationEditor value={operation} onOperationChange={setOperation} />
        <div className={styles.operationWrapper}>
          <VariablesEditor value={variables} onVariablesChange={setVariables} />
          <HeadersEditor value={headers} onHeadersChange={setHeaders} />
        </div>
      </div>
      <div className={styles.responseWrapper}>
        <Response value={parseError || JSON.stringify(error) || JSON.stringify(data)} />
      </div>
    </form>
  );
};
