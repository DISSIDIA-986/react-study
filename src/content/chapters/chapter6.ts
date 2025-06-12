import { Chapter } from '../../types/course';

export const chapter6: Chapter = {
  id: 'chapter6',
  title: '高级特性',
  description: '学习React的高级特性和最佳实践，包括自定义Hook、错误边界、Portal和Context的高级用法。',
  duration: '2小时',
  difficulty: 'advanced',
  sections: [
    {
      id: 'section6.1',
      title: '自定义Hook',
      content: `自定义Hook是React中复用逻辑的强大工具。
      通过自定义Hook，我们可以将组件逻辑提取到可重用的函数中。

      关键概念：
      1. Hook的命名规范
      2. Hook的依赖管理
      3. Hook的组合使用
      4. Hook的测试策略

      最佳实践：
      - 遵循Hook的命名规范（use前缀）
      - 合理管理Hook的依赖
      - 保持Hook的单一职责
      - 编写可测试的Hook`,
      codeExample: `// 1. 基础自定义Hook
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

// 2. 组合Hook
const useTaskManager = () => {
  const [tasks, setTasks] = useLocalStorage<TaskProps[]>('tasks', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  const addTask = useCallback((title: string) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: Date.now(), title, completed: false }
    ]);
  }, [setTasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    filter,
    setFilter
  };
};

// 3. 异步Hook
const useAsync = <T,>(asyncFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
};

// 4. 测试Hook
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  return { count, increment, decrement };
};

// 使用示例
const TaskManager: React.FC = () => {
  const { tasks, addTask, toggleTask, filter, setFilter } = useTaskManager();
  const { data: userData, loading, error, execute } = useAsync(() => 
    fetch('/api/user').then(res => res.json())
  );

  return (
    <div className="p-4">
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
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskItem key={task.id} {...task} onToggle={toggleTask} />
        ))}
      </div>
    </div>
  );
};`,
      tasks: [
        { id: '1', title: '实现useLocalStorage Hook', description: '' },
        { id: '2', title: '创建useTaskManager Hook', description: '' },
        { id: '3', title: '实现useAsync Hook', description: '' }
      ]
    },
    {
      id: 'section6.2',
      title: '错误边界',
      content: `错误边界是React中处理组件树错误的重要机制。
      通过错误边界，我们可以优雅地处理组件中的错误，防止整个应用崩溃。

      关键概念：
      1. 错误边界的生命周期
      2. 错误边界的限制
      3. 错误恢复策略
      4. 错误日志记录

      最佳实践：
      - 在关键组件周围使用错误边界
      - 实现优雅的错误恢复
      - 记录错误信息
      - 提供用户友好的错误提示`,
      codeExample: `// 1. 基础错误边界
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 可以在这里发送错误日志到服务器
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">出错了</h2>
          <p className="mt-2 text-gray-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 2. 带重试功能的错误边界
class RetryErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    onRetry?: () => void;
    maxRetries?: number;
  },
  {
    hasError: boolean;
    error: Error | null;
    retryCount: number;
  }
> {
  constructor(props: {
    children: React.ReactNode;
    onRetry?: () => void;
    maxRetries?: number;
  }) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    if (this.props.onRetry) {
      this.props.onRetry();
    }
    this.setState({ hasError: false, error: null, retryCount: this.state.retryCount + 1 });
  };

  render() {
    if (this.state.hasError) {
      const maxRetries = this.props.maxRetries || 3;
      const canRetry = this.state.retryCount < maxRetries;

      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">出错了</h2>
          <p className="mt-2 text-gray-600">{this.state.error?.message}</p>
          {canRetry ? (
            <button
              onClick={this.handleRetry}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              重试 ({this.state.retryCount + 1}/{maxRetries})
            </button>
          ) : (
            <p className="mt-4 text-red-500">已达到最大重试次数</p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// 3. 带错误日志的错误边界
class LoggingErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: {
    children: React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">出错了</h2>
          <p className="mt-2 text-gray-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用示例
const TaskManager: React.FC = () => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // 发送错误日志到服务器
    console.error('Error in TaskManager:', error, errorInfo);
  };

  return (
    <LoggingErrorBoundary onError={handleError}>
      <RetryErrorBoundary maxRetries={3}>
        <TaskList />
      </RetryErrorBoundary>
    </LoggingErrorBoundary>
  );
};`,
      tasks: [
        { id: '4', title: '实现基础错误边界', description: '' },
        { id: '5', title: '添加重试功能', description: '' },
        { id: '6', title: '实现错误日志记录', description: '' }
      ]
    },
    {
      id: 'section6.3',
      title: 'Portal和Context高级用法',
      content: `Portal和Context是React中强大的特性，用于处理DOM渲染和状态共享。
      通过合理使用这些特性，我们可以构建更灵活和可维护的应用。

      关键概念：
      1. Portal的使用场景
      2. Context的性能优化
      3. Context的组合使用
      4. Portal和Context的配合

      最佳实践：
      - 合理使用Portal处理模态框等场景
      - 优化Context的性能
      - 组合多个Context
      - 处理Portal的事件冒泡`,
      codeExample: `// 1. Portal组件
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

// 2. 优化的Context
const TaskContext = React.createContext<{
  tasks: TaskProps[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
} | null>(null);

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const value = useMemo(
    () => ({
      tasks,
      addTask: (title: string) => {
        setTasks(prev => [
          ...prev,
          { id: Date.now(), title, completed: false }
        ]);
      },
      toggleTask: (id: number) => {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    }),
    [tasks]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// 3. 组合Context
const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
      }
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. 使用Portal和Context的组件
const TaskModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const taskContext = useContext(TaskContext);
  const themeContext = useContext(ThemeContext);

  if (!taskContext || !themeContext) {
    throw new Error('TaskModal must be used within TaskProvider and ThemeProvider');
  }

  const { addTask } = taskContext;
  const { theme } = themeContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    if (title) {
      addTask(title);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className={\`\${theme === 'dark' ? 'text-white' : 'text-gray-900'}\`}>
        <h2 className="text-xl font-bold mb-4">添加新任务</h2>
        <input
          type="text"
          name="title"
          className="w-full p-2 border rounded mb-4"
          placeholder="输入任务标题"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          添加
        </button>
      </form>
    </Modal>
  );
};

// 使用示例
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            添加任务
          </button>
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};`,
      tasks: [
        { id: '7', title: '实现Modal Portal', description: '' },
        { id: '8', title: '优化Context性能', description: '' },
        { id: '9', title: '组合多个Context', description: '' }
      ]
    }
  ]
}; 