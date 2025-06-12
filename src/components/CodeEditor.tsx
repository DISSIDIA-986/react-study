import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = 'typescript',
  readOnly = true,
  onChange
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {isCopied ? '已复制' : '复制'}
        </button>
      </div>
      {readOnly ? (
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            padding: '1rem'
          }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <textarea
          value={code}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />
      )}
    </div>
  );
}; 