import React from 'react';
import { Link } from 'react-router-dom';
import { chapters } from '../../content/chapters';

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React 学习之旅
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过实践学习 React 的核心概念和最佳实践，从基础到高级，循序渐进地掌握 React 开发技能。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">课程章节</h2>
          <p className="text-gray-600 mb-4">
            系统学习 React 的各个核心概念，包括组件、状态管理、性能优化等。
          </p>
          <Link
            to="/chapters"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            开始学习
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">练习挑战</h2>
          <p className="text-gray-600 mb-4">
            通过实践项目巩固所学知识，提升实际开发能力。
          </p>
          <Link
            to="/challenges"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            查看挑战
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">参考文档</h2>
          <p className="text-gray-600 mb-4">
            查阅详细的 API 文档和最佳实践指南，解决开发中的问题。
          </p>
          <Link
            to="/reference"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            浏览文档
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">课程概览</h2>
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{chapter.title}</h3>
                <p className="text-sm text-gray-600">{chapter.description}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>难度: {chapter.difficulty}</span>
                <span>时长: {chapter.duration}</span>
                <Link
                  to={`/chapters/${chapter.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 