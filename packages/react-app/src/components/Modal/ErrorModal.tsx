import React from 'react';
import { Alert } from 'antd';

const ErrorModal = ({ content }: { content: string }): JSX.Element | null => {
  return content ? (
    <div
      style={{
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: 60,
        padding: 16,
      }}
    >
      <Alert closable message={content} showIcon type="error" />
    </div>
  ) : null;
};

export default ErrorModal;
