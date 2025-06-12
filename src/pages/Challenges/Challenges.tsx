import React from 'react';

export const Challenges: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">练习挑战</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过实践项目巩固所学知识，提升实际开发能力。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">待办事项应用</h2>
          <p className="text-gray-600 mb-4">
            实现一个完整的待办事项应用，包括添加、编辑、删除和标记完成功能。
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>难度: 初级</span>
            <span>时长: 2小时</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            开始挑战
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">购物车应用</h2>
          <p className="text-gray-600 mb-4">
            实现一个购物车应用，包括商品列表、购物车管理和结算功能。
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>难度: 中级</span>
            <span>时长: 3小时</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            开始挑战
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">社交媒体应用</h2>
          <p className="text-gray-600 mb-4">
            实现一个简单的社交媒体应用，包括用户认证、发帖和评论功能。
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>难度: 高级</span>
            <span>时长: 4小时</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            开始挑战
          </button>
        </div>
      </div>
    </div>
  );
}; 