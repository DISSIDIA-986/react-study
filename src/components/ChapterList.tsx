import React from 'react';
import { Link } from 'react-router-dom';
import { Chapter } from '../types/course';

interface ChapterListProps {
  chapters: Chapter[];
}

export const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          to={`/chapters/${chapter.id}`}
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{chapter.title}</h2>
          <p className="text-gray-600 mb-4">{chapter.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>难度: {chapter.difficulty}</span>
            <span>时长: {chapter.duration}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">章节内容:</h3>
            <ul className="space-y-1">
              {chapter.sections.map((section) => (
                <li key={section.id} className="text-sm text-gray-600">
                  {section.title}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}; 