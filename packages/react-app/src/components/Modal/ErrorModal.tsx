import React from 'react';
import { Alert } from 'antd';

const ErrorModal = ({ content, onClose }: { content: string; onClose: () => void }): JSX.Element | null => {
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
      <Alert closable message={content} showIcon type="error" afterClose={onClose} />
    </div>
  ) : null;
};

export default ErrorModal;
