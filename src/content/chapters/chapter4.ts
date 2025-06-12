import { Chapter } from '../../types/course';

export const chapter4: Chapter = {
  id: 'chapter4',
  title: '组件通信',
  description: '学习React中的组件通信方式，包括Props、Context和状态管理。',
  duration: '1.5小时',
  difficulty: 'intermediate',
  sections: [
    {
      id: 'section4.1',
      title: 'Props通信',
      content: `Props是React组件之间通信的基本方式，理解Props的使用和最佳实践对于构建可维护的React应用至关重要。

      关键概念：
      1. Props的单向数据流
      2. Props的类型定义
      3. Props的默认值
      4. Props的传递方式

      最佳实践：
      - 使用TypeScript定义Props类型
      - 为Props提供默认值
      - 避免Props钻取
      - 使用组合代替继承`,
      codeExample: `// 1. Props类型定义
interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, title: string) => void;
}

// 2. 使用默认值
const TaskItem: React.FC<TaskProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit?.(id, editTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 border rounded-lg mb-2">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full p-2 border rounded"
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
        />
      ) : (
        <h3 className="text-lg font-medium">{title}</h3>
      )}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onToggle?.(id)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {completed ? '标记为未完成' : '标记为已完成'}
        </button>
        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          {isEditing ? '保存' : '编辑'}
        </button>
        <button
          onClick={() => onDelete?.(id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          删除
        </button>
      </div>
    </div>
  );
};

// 3. Props组合
const TaskList: React.FC<{ tasks: TaskProps[] }> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

// 4. 使用Render Props
interface TaskListProps {
  tasks: TaskProps[];
  renderTask: (task: TaskProps) => React.ReactNode;
}

const TaskListWithRenderProps: React.FC<TaskListProps> = ({ tasks, renderTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => renderTask(task))}
    </div>
  );
};

// 使用示例
const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const handleToggle = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleEdit = (id: number, title: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title } : task
      )
    );
  };

  return (
    <TaskListWithRenderProps
      tasks={tasks}
      renderTask={task => (
        <TaskItem
          key={task.id}
          {...task}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    />
  );
};`,
      tasks: [
        { id: '1', title: '实现Props类型定义', description: '' },
        { id: '2', title: '添加Props默认值', description: '' },
        { id: '3', title: '实现Render Props模式', description: '' }
      ]
    },
    {
      id: 'section4.2',
      title: 'Context通信',
      content: `Context提供了一种在组件树中共享数据的方式，避免了Props钻取。
      理解Context的使用场景和最佳实践对于构建大型React应用很重要。

      关键概念：
      1. Context的创建和使用
      2. Context的性能优化
      3. Context的嵌套使用
      4. Context的默认值

      最佳实践：
      - 将Context拆分为多个小Context
      - 使用useMemo优化Context值
      - 避免在Context中存储频繁变化的数据
      - 使用TypeScript定义Context类型`,
      codeExample: `// 1. 创建Context
interface TaskContextType {
  tasks: TaskProps[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 2. 创建Provider组件
const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const addTask = useCallback((title: string) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const editTask = useCallback((id: number, title: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title } : task
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      editTask
    }),
    [tasks, addTask, toggleTask, deleteTask, editTask]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// 3. 创建自定义Hook
const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// 4. 使用Context的组件
const TaskList: React.FC = () => {
  const { tasks, toggleTask, deleteTask, editTask } = useTaskContext();

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          {...task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </div>
  );
};

const TaskForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
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

// 5. 使用Provider的根组件
const TaskManager: React.FC = () => {
  return (
    <TaskProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">任务管理器</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};`,
      tasks: [
        { id: '4', title: '创建TaskContext', description: '' },
        { id: '5', title: '实现TaskProvider', description: '' },
        { id: '6', title: '使用Context的组件', description: '' }
      ]
    },
    {
      id: 'section4.3',
      title: '状态管理',
      content: `状态管理是React应用中的重要部分，理解不同的状态管理方案和最佳实践对于构建可维护的应用至关重要。

      关键概念：
      1. 本地状态管理
      2. 全局状态管理
      3. 状态持久化
      4. 状态同步

      最佳实践：
      - 合理划分状态作用域
      - 使用Reducer管理复杂状态
      - 实现状态持久化
      - 处理状态同步问题`,
      codeExample: `// 1. 使用Reducer管理状态
type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'EDIT_TASK'; payload: { id: number; title: string } };

const taskReducer = (state: TaskProps[], action: TaskAction): TaskProps[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          completed: false
        }
      ];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task
      );
    default:
      return state;
  }
};

// 2. 使用Reducer的组件
const TaskManagerWithReducer: React.FC = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = (title: string) => {
    dispatch({ type: 'ADD_TASK', payload: title });
  };

  const toggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const editTask = (id: number, title: string) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, title } });
  };

  return (
    <TaskProvider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask
      }}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">任务管理器</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

// 3. 状态持久化
const usePersistedReducer = <T, A>(
  reducer: React.Reducer<T, A>,
  initialState: T,
  key: string
): [T, React.Dispatch<A>] => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};

// 4. 使用持久化Reducer的组件
const TaskManagerWithPersistence: React.FC = () => {
  const [tasks, dispatch] = usePersistedReducer(taskReducer, [], 'tasks');

  // ... 其他代码与TaskManagerWithReducer相同
};

// 5. 状态同步
const useSyncState = <T,>(initialState: T, key: string): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [state, setState];
};

// 6. 使用同步状态的组件
const TaskManagerWithSync: React.FC = () => {
  const [tasks, setTasks] = useSyncState<TaskProps[]>([], 'tasks');

  // ... 其他代码与TaskManagerWithReducer相同
};`,
      tasks: [
        { id: '7', title: '实现Reducer状态管理', description: '' },
        { id: '8', title: '添加状态持久化', description: '' },
        { id: '9', title: '实现状态同步', description: '' }
      ]
    }
  ]
}; 