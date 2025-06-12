import { Chapter } from '../../types/course';

export const chapter2: Chapter = {
  id: 'chapter2',
  title: '用户交互',
  description: '学习如何处理用户交互，包括事件处理、状态更新和条件渲染。',
  duration: '1.5小时',
  difficulty: 'beginner',
  sections: [
    {
      id: 'section2.1',
      title: '事件处理',
      description: '',
      content: `React中的事件处理与DOM事件处理类似，但有一些语法差异。
      所有事件名称都使用驼峰命名法，并且事件处理函数接收一个合成事件对象。

      关键概念：
      1. 事件处理函数命名：使用handle前缀
      2. 合成事件：React的事件系统是跨浏览器的
      3. 事件委托：React在顶层使用事件委托
      4. 事件对象：包含事件相关的所有信息

      最佳实践：
      - 使用箭头函数避免this绑定问题
      - 提取复杂的事件处理逻辑到单独的函数
      - 使用事件对象阻止默认行为或冒泡
      - 注意事件处理函数的性能优化`,
      codeExample: `// 1. 基础事件处理
const TaskItem: React.FC<TaskProps> = ({ id, title, completed, onToggle }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle?.(id);
  };

  return (
    <div 
      className="p-4 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
      onClick={handleClick}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-gray-600">
        状态: {completed ? '已完成' : '未完成'}
      </p>
    </div>
  );
};

// 2. 表单事件处理
const TaskForm: React.FC<{ onSubmit: (title: string) => void }> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="输入新任务..."
      />
      <button 
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        添加任务
      </button>
    </form>
  );
};

// 3. 键盘事件处理
const SearchInput: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full p-2 border rounded"
      placeholder="搜索任务..."
    />
  );
};`,
      tasks: [
        { id: '1', title: '实现点击事件处理', description: '' },
        { id: '2', title: '添加表单提交处理', description: '' },
        { id: '3', title: '实现键盘事件处理', description: '' }
      ]
    },
    {
      id: 'section2.2',
      title: '状态更新',
      description: '',
      content: `状态更新是 React 组件交互的核心。
      理解状态更新的机制对于构建可靠的React应用至关重要。

      关键概念：
      1. 状态更新是异步的
      2. 多个状态更新会被批处理
      3. 状态更新会触发重新渲染
      4. 可以使用函数式更新来避免状态依赖

      最佳实践：
      - 使用函数式更新处理依赖状态
      - 避免在渲染期间更新状态
      - 将状态更新逻辑提取到自定义Hook
      - 使用useCallback优化回调函数`,
      codeExample: `// 1. 基础状态更新
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 2. 使用函数式更新
  const addTask = (title: string) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);
  };

  // 3. 批量状态更新
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    setFilter('all');
  };

  // 4. 状态依赖处理
  const toggleAll = () => {
    setTasks(prevTasks => {
      const allCompleted = prevTasks.every(task => task.completed);
      return prevTasks.map(task => ({
        ...task,
        completed: !allCompleted
      }));
    });
  };

  return (
    <div className="p-4">
      <TaskForm onSubmit={addTask} />
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={\`px-3 py-1 rounded \${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('active')}
          className={\`px-3 py-1 rounded \${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          进行中
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={\`px-3 py-1 rounded \${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          已完成
        </button>
      </div>
      <TaskList
        tasks={tasks.filter(task => {
          if (filter === 'active') return !task.completed;
          if (filter === 'completed') return task.completed;
          return true;
        })}
        onToggle={toggleTask}
      />
    </div>
  );
};`,
      tasks: [
        { id: '4', title: '实现任务状态更新', description: '' },
        { id: '5', title: '添加任务过滤功能', description: '' },
        { id: '6', title: '实现批量操作功能', description: '' }
      ]
    },
    {
      id: 'section2.3',
      title: '条件渲染',
      description: '',
      content: `条件渲染允许你根据状态动态显示内容。
      可以使用多种方式实现条件渲染，每种方式都有其适用场景。

      关键概念：
      1. 使用if语句和三元运算符
      2. 使用逻辑与运算符
      3. 使用条件组件
      4. 使用枚举对象

      最佳实践：
      - 保持条件渲染逻辑简单
      - 提取复杂条件到变量或函数
      - 使用组件组合代替条件渲染
      - 注意条件渲染的性能影响`,
      codeExample: `// 1. 使用三元运算符
const TaskStatus: React.FC<{ completed: boolean }> = ({ completed }) => {
  return (
    <div className="flex items-center">
      {completed ? (
        <span className="text-green-500">已完成</span>
      ) : (
        <span className="text-yellow-500">进行中</span>
      )}
    </div>
  );
};

// 2. 使用逻辑与运算符
const TaskList: React.FC<{ tasks: TaskProps[] }> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 && (
        <div className="text-center text-gray-500">暂无任务</div>
      )}
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

// 3. 使用条件组件
const TaskFilter: React.FC<{ filter: string; onFilterChange: (filter: string) => void }> = ({
  filter,
  onFilterChange
}) => {
  const filters = {
    all: '全部',
    active: '进行中',
    completed: '已完成'
  };

  return (
    <div className="flex gap-2">
      {Object.entries(filters).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={\`px-3 py-1 rounded \${filter === key ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// 4. 使用枚举对象
const TaskPriority: React.FC<{ priority: 'low' | 'medium' | 'high' }> = ({ priority }) => {
  const priorityStyles = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const priorityLabels = {
    low: '低优先级',
    medium: '中优先级',
    high: '高优先级'
  };

  return (
    <span className={\`px-2 py-1 rounded text-sm \${priorityStyles[priority]}\`}>
      {priorityLabels[priority]}
    </span>
  );
};`,
      tasks: [
        { id: '7', title: '实现条件渲染', description: '' },
        { id: '8', title: '添加任务状态显示', description: '' },
        { id: '9', title: '实现优先级显示', description: '' }
      ]
    }
  ]
}; 