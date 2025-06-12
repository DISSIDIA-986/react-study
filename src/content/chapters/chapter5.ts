import { Chapter } from '../../types/course';

export const chapter5: Chapter = {
  id: 'chapter5',
  title: '性能优化',
  description: '学习React应用的性能优化技巧和最佳实践，包括渲染优化、代码分割和缓存策略。',
  duration: '1.5小时',
  difficulty: 'intermediate',
  sections: [
    {
      id: 'section5.1',
      title: '渲染优化',
      content: `React应用的性能优化首先从渲染优化开始。
      理解React的渲染机制和优化技巧对于构建高性能应用至关重要。

      关键概念：
      1. React的渲染机制
      2. 避免不必要的渲染
      3. 使用React.memo
      4. 使用useMemo和useCallback

      最佳实践：
      - 合理使用React.memo
      - 正确使用useMemo和useCallback
      - 避免在渲染期间进行复杂计算
      - 使用React DevTools分析性能`,
      codeExample: `// 1. 使用React.memo优化组件
const TaskItem = React.memo<TaskProps>(({ id, title, completed, onToggle }) => {
  console.log('TaskItem rendered:', id);
  return (
    <div className="p-4 border rounded-lg mb-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <button
        onClick={() => onToggle?.(id)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        {completed ? '标记为未完成' : '标记为已完成'}
      </button>
    </div>
  );
});

// 2. 使用useMemo优化计算
const TaskList: React.FC<{ tasks: TaskProps[]; filter: string }> = ({ tasks, filter }) => {
  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks...');
    return tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

// 3. 使用useCallback优化回调函数
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleToggle = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleFilterChange = useCallback((newFilter: typeof filter) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={\`px-3 py-1 rounded \${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          全部
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={\`px-3 py-1 rounded \${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          进行中
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={\`px-3 py-1 rounded \${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
        >
          已完成
        </button>
      </div>
      <TaskList tasks={tasks} filter={filter} onToggle={handleToggle} />
    </div>
  );
};

// 4. 使用useReducer优化状态更新
const taskReducer = (state: TaskProps[], action: TaskAction): TaskProps[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
};

const TaskManagerWithReducer: React.FC = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const handleToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  return (
    <div className="p-4">
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </div>
  );
};`,
      tasks: [
        { id: 1, title: '使用React.memo优化组件', completed: false },
        { id: 2, title: '实现useMemo优化', completed: false },
        { id: 3, title: '使用useCallback优化回调', completed: false }
      ]
    },
    {
      id: 'section5.2',
      title: '代码分割',
      content: `代码分割是优化React应用加载性能的重要技术。
      通过代码分割，我们可以将应用拆分成更小的块，实现按需加载。

      关键概念：
      1. 路由级别的代码分割
      2. 组件级别的代码分割
      3. 预加载策略
      4. 加载状态处理

      最佳实践：
      - 合理划分代码块
      - 实现预加载策略
      - 处理加载状态
      - 优化加载体验`,
      codeExample: `// 1. 路由级别的代码分割
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const TaskList = lazy(() => import('./pages/TaskList'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Suspense>
  );
};

// 2. 组件级别的代码分割
const TaskForm = lazy(() => import('./components/TaskForm'));
const TaskFilter = lazy(() => import('./components/TaskFilter'));

const TaskManager: React.FC = () => {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading form...</div>}>
        <TaskForm />
      </Suspense>
      <Suspense fallback={<div>Loading filter...</div>}>
        <TaskFilter />
      </Suspense>
    </div>
  );
};

// 3. 预加载策略
const usePreload = (importFn: () => Promise<any>) => {
  useEffect(() => {
    const preload = async () => {
      await importFn();
    };
    preload();
  }, [importFn]);
};

const TaskManagerWithPreload: React.FC = () => {
  usePreload(() => import('./components/TaskForm'));
  usePreload(() => import('./components/TaskFilter'));

  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <TaskForm />
        <TaskFilter />
      </Suspense>
    </div>
  );
};

// 4. 加载状态处理
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">出错了</h2>
        <button
          onClick={() => setHasError(false)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          重试
        </button>
      </div>
    );
  }

  return children;
};

const TaskManagerWithErrorBoundary: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <TaskForm />
        <TaskFilter />
      </Suspense>
    </ErrorBoundary>
  );
};`,
      tasks: [
        { id: 4, title: '实现路由代码分割', completed: false },
        { id: 5, title: '添加组件预加载', completed: false },
        { id: 6, title: '实现错误边界', completed: false }
      ]
    },
    {
      id: 'section5.3',
      title: '缓存策略',
      content: `缓存策略是优化React应用性能的重要手段。
      通过合理的缓存策略，我们可以减少不必要的计算和网络请求。

      关键概念：
      1. 数据缓存
      2. 组件缓存
      3. 请求缓存
      4. 状态缓存

      最佳实践：
      - 使用React Query管理请求缓存
      - 实现组件缓存
      - 优化数据获取策略
      - 处理缓存失效`,
      codeExample: `// 1. 使用React Query管理请求缓存
import { useQuery, useMutation, useQueryClient } from 'react-query';

const TaskList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery('tasks', async () => {
    const response = await fetch('/api/tasks');
    return response.json();
  });

  const mutation = useMutation(
    async (newTask: TaskProps) => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

// 2. 实现组件缓存
const CachedTaskItem = React.memo<TaskProps>(
  ({ id, title, completed, onToggle }) => {
    return (
      <div className="p-4 border rounded-lg mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <button
          onClick={() => onToggle?.(id)}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          {completed ? '标记为未完成' : '标记为已完成'}
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.completed === nextProps.completed
    );
  }
);

// 3. 优化数据获取策略
const useTaskData = (taskId: number) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['task', taskId],
    async () => {
      const response = await fetch(\`/api/tasks/\${taskId}\`);
      return response.json();
    },
    {
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 30 * 60 * 1000, // 30分钟
      onSuccess: (data) => {
        queryClient.setQueryData(['task', taskId], data);
      }
    }
  );
};

// 4. 处理缓存失效
const TaskManager: React.FC = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (taskId: number) => {
      const response = await fetch(\`/api/tasks/\${taskId}\`, {
        method: 'DELETE'
      });
      return response.json();
    },
    {
      onSuccess: (_, taskId) => {
        queryClient.removeQueries(['task', taskId]);
        queryClient.invalidateQueries('tasks');
      }
    }
  );

  return (
    <div className="p-4">
      <TaskList />
    </div>
  );
};

// 5. 实现状态缓存
const useCachedState = <T,>(key: string, initialState: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const TaskManagerWithCachedState: React.FC = () => {
  const [tasks, setTasks] = useCachedState<TaskProps[]>('tasks', []);

  return (
    <div className="p-4">
      <TaskList tasks={tasks} onTasksChange={setTasks} />
    </div>
  );
};`,
      tasks: [
        { id: 7, title: '实现请求缓存', completed: false },
        { id: 8, title: '添加组件缓存', completed: false },
        { id: 9, title: '优化数据获取策略', completed: false }
      ]
    }
  ]
}; 