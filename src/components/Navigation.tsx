import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { chapters } from '../content/chapters';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-4 text-gray-900 hover:text-blue-600"
            >
              首页
            </Link>
            <Link
              to="/chapters"
              className={`flex items-center px-4 ${
                isActive('/chapters') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              课程章节
            </Link>
            <Link
              to="/challenges"
              className={`flex items-center px-4 ${
                isActive('/challenges') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              练习挑战
            </Link>
            <Link
              to="/reference"
              className={`flex items-center px-4 ${
                isActive('/reference') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              参考文档
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 