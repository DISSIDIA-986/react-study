export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  tasks?: Task[];
  completed?: boolean;
}

export interface CourseProgress {
  chapterId: string;
  sectionId: string;
  completed: boolean;
  lastAccessed: Date;
} 