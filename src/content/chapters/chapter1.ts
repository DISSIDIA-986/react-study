import { Chapter } from '../../types/course';

export const chapter1: Chapter = {
  id: 'chapter1',
  title: '从静态到动态',
  description: '学习如何将静态的任务列表转换为动态的React组件，理解组件和JSX的基本概念。',
  duration: '1.5小时',
  difficulty: 'beginner',
  sections: [
    {
      id: 'section1.1',
      title: 'JSX与组件',
      description: '',
      content: `JSX是JavaScript的语法扩展，它允许我们在JavaScript中编写类似HTML的代码。
      在React中，我们使用JSX来描述UI应该是什么样子。组件是React应用的基本构建块，
      它们可以接收输入（props）并返回描述屏幕上显示内容的React元素。

      关键概念：
      1. JSX语法：允许在JavaScript中直接编写HTML-like代码
      2. 组件：可重用的UI构建块
      3. 组件命名：使用大驼峰命名法（PascalCase）
      4. 组件结构：函数组件和类组件（本教程主要使用函数组件）

      最佳实践：
      - 组件应该是纯函数，相同的输入总是产生相同的输出
      - 组件名称应该清晰表达其用途
      - 保持组件小而专注，每个组件只做一件事`,
      codeExample: `// 1. 基础组件示例
const TaskItem = ({ title, completed }) => {
  return (
    <div className="p-4 border rounded-lg mb-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-gray-600">
        状态: {completed ? '已完成' : '未完成'}
      </p>
    </div>
  );
};

// 2. 使用条件渲染
const TaskStatus = ({ completed }) => {
  return (
    <div className="flex items-center">
      <span className={\`w-3 h-3 rounded-full mr-2 \${completed ? 'bg-green-500' : 'bg-gray-300'}\`} />
      <span>{completed ? '已完成' : '进行中'}</span>
    </div>
  );
};

// 3. 组合组件
const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <TaskItem title={task.title} completed={task.completed} />
      <TaskStatus completed={task.completed} />
    </div>
  );
};`,
      tasks: [
        { id: '1', title: '创建TaskItem组件', description: '' },
        { id: '2', title: '创建TaskList组件', description: '' },
        { id: '3', title: '实现条件渲染', description: '' }
      ]
    },
    {
      id: 'section1.2',
      title: 'Props数据流',
      description: '',
      content: `Props（属性）是React组件之间传递数据的主要方式。
      它们是从父组件流向子组件的单向数据流。通过props，
      我们可以将数据从父组件传递到子组件，使组件之间能够进行通信。`,
      codeExample: `// 父组件
function ParentComponent() {
  const [tasks, setTasks] = useState([]);
  return <TaskList tasks={tasks} />;
}

// 子组件
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}`,
      tasks: [
        { id: '4', title: '实现TaskList组件', description: '' },
        { id: '5', title: '添加Props类型检查', description: '' },
        { id: '6', title: '实现组件组合', description: '' }
      ]
    },
    {
      id: 'section1.3',
      title: '初始状态管理',
      description: '',
      content: `useState是React的一个Hook，它允许我们在函数组件中添加状态。
      通过useState，我们可以创建和管理组件的状态，使组件具有交互性。
      状态更新会触发组件重新渲染，从而更新UI。`,
      codeExample: `function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <TaskList tasks={tasks} />
      <TaskFilter value={filter} onChange={setFilter} />
    </div>
  );
}`,
      tasks: [
        { id: '7', title: '添加useState Hook', description: '' },
        { id: '8', title: '实现任务状态更新', description: '' },
        { id: '9', title: '优化状态更新函数', description: '' }
      ]
    }
  ]
}; 