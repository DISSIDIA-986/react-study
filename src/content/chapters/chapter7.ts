import { Chapter } from '../../types/course';

export const chapter7: Chapter = {
  id: 'chapter7',
  title: '测试与部署',
  description: '学习如何测试和部署 React 应用，包括单元测试、集成测试和部署流程。',
  duration: '1.5小时',
  difficulty: '中级',
  sections: [
    {
      id: 'section7-1',
      title: '单元测试',
      description: '学习如何使用 Jest 和 React Testing Library 编写单元测试。',
      content: `
# 单元测试

单元测试是确保 React 组件正确性的重要手段。我们将学习使用 Jest 和 React Testing Library 来编写测试。

## 关键概念

1. Jest 测试框架
2. React Testing Library
3. 组件测试策略
4. 测试覆盖率

## 最佳实践

- 测试组件行为而不是实现
- 模拟用户交互
- 保持测试独立性
- 确保合理的测试覆盖率

## 示例代码

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from './TaskList';

describe('TaskList', () => {
  it('renders task list correctly', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];

    render(<TaskList tasks={tasks} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('handles task completion', () => {
    const tasks = [{ id: '1', title: 'Task 1', completed: false }];
    const onToggle = jest.fn();

    render(<TaskList tasks={tasks} onToggle={onToggle} />);
    
    fireEvent.click(screen.getByText('Task 1'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});
\`\`\`

## 练习任务

1. 为现有组件编写单元测试
2. 实现测试覆盖率报告
3. 添加更多测试用例
      `,
      tasks: [
        {
          id: 'task7-1-1',
          title: '为现有组件编写单元测试',
          description: '为之前创建的组件编写单元测试，确保基本功能正常。',
        },
        {
          id: 'task7-1-2',
          title: '实现测试覆盖率报告',
          description: '配置 Jest 以生成测试覆盖率报告，并分析结果。',
        },
        {
          id: 'task7-1-3',
          title: '添加更多测试用例',
          description: '为组件添加更多测试用例，覆盖边界条件和错误情况。',
        },
      ],
    },
    {
      id: 'section7-2',
      title: '集成测试',
      description: '学习如何编写集成测试，验证多个组件之间的交互。',
      content: `
# 集成测试

集成测试用于验证多个组件之间的交互是否正常。我们将学习如何编写有效的集成测试。

## 关键概念

1. 组件集成测试
2. 路由测试
3. 状态管理测试
4. 测试数据管理

## 最佳实践

- 测试关键用户流程
- 模拟外部依赖
- 使用测试数据工厂
- 保持测试可维护性

## 示例代码

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TaskManager } from './TaskManager';

describe('TaskManager Integration', () => {
  it('handles complete task flow', () => {
    render(
      <BrowserRouter>
        <TaskManager />
      </BrowserRouter>
    );

    // 添加任务
    fireEvent.change(screen.getByPlaceholderText('输入任务内容'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('添加'));

    // 验证任务显示
    expect(screen.getByText('New Task')).toBeInTheDocument();

    // 完成任务
    fireEvent.click(screen.getByText('New Task'));
    expect(screen.getByText('New Task')).toHaveClass('completed');
  });
});
\`\`\`

## 练习任务

1. 实现路由集成测试
2. 添加状态管理测试
3. 创建测试数据工厂
      `,
      tasks: [
        {
          id: 'task7-2-1',
          title: '实现路由集成测试',
          description: '为应用的路由功能编写集成测试。',
        },
        {
          id: 'task7-2-2',
          title: '添加状态管理测试',
          description: '测试状态管理相关的功能，包括状态更新和持久化。',
        },
        {
          id: 'task7-2-3',
          title: '创建测试数据工厂',
          description: '实现测试数据工厂，用于生成测试数据。',
        },
      ],
    },
    {
      id: 'section7-3',
      title: '部署流程',
      description: '学习如何部署 React 应用，包括构建优化和 CI/CD 配置。',
      content: `
# 部署流程

部署是确保 React 应用顺利上线的重要环节。我们将学习完整的部署流程。

## 关键概念

1. 构建优化
2. 环境配置
3. CI/CD 流程
4. 监控和日志

## 最佳实践

- 优化构建输出
- 管理环境变量
- 自动化部署流程
- 实现监控告警

## 示例代码

\`\`\`yaml
# GitHub Actions 配置
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: '{{ secrets.CF_API_TOKEN }}'
          accountId: 'your-account-id'
          projectName: 'your-project-name'
          directory: 'dist'
          gitHubToken: '{{ secrets.GITHUB_TOKEN }}'
\`\`\`

## 练习任务

1. 配置构建优化
2. 设置环境变量
3. 实现自动化部署

// 环境配置示例
// .env.production
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production

// .env.development
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development

// 使用环境变量
const apiUrl = process.env.REACT_APP_API_URL;
const environment = process.env.REACT_APP_ENV;

// 根据环境配置 API 客户端
const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
      `,
      tasks: [
        {
          id: 'task7-3-1',
          title: '配置构建优化',
          description: '优化应用的构建配置，提高构建效率。',
        },
        {
          id: 'task7-3-2',
          title: '设置环境变量',
          description: '配置不同环境的变量，确保应用正确运行。',
        },
        {
          id: 'task7-3-3',
          title: '实现自动化部署',
          description: '设置 CI/CD 流程，实现自动化部署。',
        },
      ],
    },
  ],
}; 