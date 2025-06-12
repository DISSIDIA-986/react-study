import { Chapter } from '../../types/course';

export const chapter3: Chapter = {
  id: 'chapter3',
  title: '列表与表单',
  description: '学习如何处理列表渲染和表单输入，包括列表渲染优化和表单验证。',
  duration: '1.5小时',
  difficulty: 'beginner',
  sections: [
    {
      id: 'section3.1',
      title: '列表渲染',
      content: `列表渲染是React中常见的模式，用于渲染数组数据。
      理解列表渲染的关键概念和最佳实践对于构建高效的React应用至关重要。

      关键概念：
      1. 使用map方法渲染列表
      2. key属性的重要性
      3. 列表项组件化
      4. 虚拟列表优化

      最佳实践：
      - 始终为列表项提供唯一的key
      - 避免使用索引作为key
      - 将列表项抽取为独立组件
      - 使用虚拟列表处理大量数据`,
      codeExample: `// 1. 基础列表渲染
const TaskList: React.FC<{ tasks: TaskProps[] }> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id} // 使用唯一ID作为key
          {...task}
        />
      ))}
    </div>
  );
};

// 2. 列表项组件化
const TaskItem: React.FC<TaskProps> = ({ id, title, completed, onToggle }) => {
  return (
    <div className="p-4 border rounded-lg mb-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <TaskStatus completed={completed} />
      <button
        onClick={() => onToggle?.(id)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        {completed ? '标记为未完成' : '标记为已完成'}
      </button>
    </div>
  );
};

// 3. 虚拟列表实现
const VirtualTaskList: React.FC<{ tasks: TaskProps[] }> = ({ tasks }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 80; // 每个任务项的高度
  const visibleItems = 10; // 可见区域显示的任务数量

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItems, tasks.length);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      className="h-[600px] overflow-auto"
      onScroll={handleScroll}
    >
      <div style={{ height: \`\${tasks.length * itemHeight}px\`, position: 'relative' }}>
        {tasks.slice(startIndex, endIndex).map(task => (
          <div
            key={task.id}
            style={{
              position: 'absolute',
              top: \`\${task.id * itemHeight}px\`,
              width: '100%'
            }}
          >
            <TaskItem {...task} />
          </div>
        ))}
      </div>
    </div>
  );
};`,
      tasks: [
        { id: '1', title: '实现基础列表渲染', description: '' },
        { id: '2', title: '创建列表项组件', description: '' },
        { id: '3', title: '实现虚拟列表', description: '' }
      ]
    },
    {
      id: 'section3.2',
      title: '表单处理',
      content: `表单处理是React应用中的重要部分，包括输入验证、状态管理和提交处理。
      理解表单处理的最佳实践可以帮助构建更好的用户体验。

      关键概念：
      1. 受控组件
      2. 表单验证
      3. 错误处理
      4. 提交处理

      最佳实践：
      - 使用受控组件管理表单状态
      - 实现实时表单验证
      - 提供清晰的错误反馈
      - 处理表单提交状态`,
      codeExample: `// 1. 基础表单组件
interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

const TaskForm: React.FC<{ onSubmit: (data: TaskFormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  // 2. 表单验证
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = '标题不能为空';
    }

    if (formData.title.length > 50) {
      newErrors.title = '标题不能超过50个字符';
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = '截止日期不能早于当前日期';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应字段的错误
    if (errors[name as keyof TaskFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // 4. 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // 重置表单
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">标题</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${errors.title ? 'border-red-500' : ''}\`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">优先级</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">截止日期</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${errors.dueDate ? 'border-red-500' : ''}\`}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        创建任务
      </button>
    </form>
  );
};`,
      tasks: [
        { id: '4', title: '实现基础表单', description: '' },
        { id: '5', title: '添加表单验证', description: '' },
        { id: '6', title: '实现错误处理', description: '' }
      ]
    },
    {
      id: 'section3.3',
      title: '表单优化',
      content: `表单优化是提升用户体验的重要环节，包括性能优化、可访问性和用户体验改进。

      关键概念：
      1. 防抖和节流
      2. 表单状态管理
      3. 可访问性支持
      4. 用户体验优化

      最佳实践：
      - 使用防抖处理频繁输入
      - 实现表单状态持久化
      - 添加键盘导航支持
      - 提供清晰的反馈`,
      codeExample: `// 1. 使用防抖优化搜索
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchForm: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 pl-10 border rounded"
        placeholder="搜索任务..."
        aria-label="搜索任务"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

// 2. 表单状态持久化
const useFormPersist = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

const PersistentTaskForm: React.FC<{ onSubmit: (data: TaskFormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useFormPersist<TaskFormData>('taskForm', {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // ... 其他表单逻辑
};

// 3. 可访问性支持
const AccessibleTaskForm: React.FC<{ onSubmit: (data: TaskFormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      setErrors({
        title: '提交失败，请重试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="任务表单"
      noValidate
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          标题
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={\`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 \${errors.title ? 'border-red-500' : ''}\`}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          required
        />
        {errors.title && (
          <p
            id="title-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.title}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={\`w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 \${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}\`}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? '提交中...' : '创建任务'}
      </button>
    </form>
  );
};`,
      tasks: [
        { id: '7', title: '实现防抖搜索', description: '' },
        { id: '8', title: '添加表单持久化', description: '' },
        { id: '9', title: '优化表单可访问性', description: '' }
      ]
    }
  ]
}; 