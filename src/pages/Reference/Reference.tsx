import React from 'react';

export const Reference: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">参考文档</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          查阅详细的 API 文档和最佳实践指南，解决开发中的问题。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">React 核心概念</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://reactjs.org/docs/components-and-props.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                组件和 Props
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/state-and-lifecycle.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                状态和生命周期
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/hooks-intro.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Hooks 介绍
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">React 高级特性</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://reactjs.org/docs/context.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Context
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/refs-and-the-dom.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Refs
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/higher-order-components.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                高阶组件
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">性能优化</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://reactjs.org/docs/optimizing-performance.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                性能优化指南
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/code-splitting.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                代码分割
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/react-api.html#reactmemo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                React.memo
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">最佳实践</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://reactjs.org/docs/thinking-in-react.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                React 开发思维
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/design-principles.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                设计原则
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org/docs/accessibility.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                可访问性
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 