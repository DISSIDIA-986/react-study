import React from 'react';
import { ChapterList } from '../../components/ChapterList';
import { chapters } from '../../content/chapters';

export const Chapters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">课程章节</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          系统学习 React 的各个核心概念，从基础到高级，循序渐进地掌握 React 开发技能。
        </p>
      </div>

      <ChapterList chapters={chapters} />
    </div>
  );
}; 