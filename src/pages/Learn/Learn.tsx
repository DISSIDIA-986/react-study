import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chapters } from '../../content/chapters';
import { CodeEditor } from '../../components/CodeEditor';
import { Task } from '../../types/course';

export const Learn: React.FC = () => {
  const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId: string }>();
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const chapter = chapters.find((c) => c.id === chapterId);
  const section = chapter?.sections.find((s) => s.id === sectionId);

  if (!chapter || !section) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">内容未找到</h1>
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

  const currentSectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  const progress = (completedTasks.length / section.tasks.length) * 100;

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
        <p className="text-gray-600 mb-4">{section.description}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      </div>

      {section.codeExample && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">示例代码</h3>
          <CodeEditor
            code={section.codeExample}
            language="typescript"
            readOnly
          />
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">练习任务</h3>
        <div className="space-y-4">
          {section.tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
            >
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              <div>
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            if (currentSectionIndex > 0) {
              navigate(`/learn/${chapterId}/${chapter.sections[currentSectionIndex - 1].id}`);
            }
          }}
          disabled={currentSectionIndex === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一节
        </button>
        <button
          onClick={() => {
            if (currentSectionIndex < chapter.sections.length - 1) {
              navigate(`/learn/${chapterId}/${chapter.sections[currentSectionIndex + 1].id}`);
            }
          }}
          disabled={currentSectionIndex === chapter.sections.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一节
        </button>
      </div>
    </div>
  );
}; 