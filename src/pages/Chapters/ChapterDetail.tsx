import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chapters } from '../../content/chapters';
import { Chapter } from '../../types/course';

export const ChapterDetail: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();

  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">章节未找到</h1>
          <button
            onClick={() => navigate('/chapters')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            返回章节列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{chapter.title}</h1>
        <p className="text-gray-600 mb-4">{chapter.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>难度: {chapter.difficulty}</span>
          <span>时长: {chapter.duration}</span>
        </div>
      </div>

      <div className="space-y-8">
        {chapter.sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/learn/${chapter.id}/${section.id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-gray-600 mb-4">{section.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">开始学习</span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 