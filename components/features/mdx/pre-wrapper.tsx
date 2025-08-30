import React from 'react';
import { CopyButton } from './copy-button';

function getRawCode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(getRawCode).join('');
  }
  if (React.isValidElement(node)) {
    // @ts-ignore
    return getRawCode(node.props.children);
  }
  return '';
}

const PreWrapper = ({ children, ...props }: React.ComponentProps<"pre">) => {
  const rawCode = getRawCode(children);

  return (
    <div className="relative group">
      <CopyButton text={rawCode} />
      <pre {...props}>{children}</pre>
    </div>
  );
};

export default PreWrapper;