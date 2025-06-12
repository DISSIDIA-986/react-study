export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | '初级' | '中级' | '高级';
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
  tasks: Task[];
}

export interface CourseProgress {
  chapterId: string;
  sectionId: string;
  completed: boolean;
  lastAccessed: Date;
} 