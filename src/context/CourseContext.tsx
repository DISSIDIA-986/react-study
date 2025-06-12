import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Chapter, CourseProgress } from '../types/course';
import { chapter1 } from '../content/chapters/chapter1';

interface CourseState {
  chapters: Chapter[];
  currentChapter: string | null;
  currentSection: string | null;
  progress: CourseProgress[];
}

type CourseAction =
  | { type: 'SET_CURRENT_CHAPTER'; payload: string }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'UPDATE_PROGRESS'; payload: CourseProgress }
  | { type: 'COMPLETE_SECTION'; payload: { chapterId: string; sectionId: string } };

const initialState: CourseState = {
  chapters: [chapter1], // 后续会添加更多章节
  currentChapter: null,
  currentSection: null,
  progress: [],
};

function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'SET_CURRENT_CHAPTER':
      return { ...state, currentChapter: action.payload };
    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.payload };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: [
          ...state.progress.filter(
            p => !(p.chapterId === action.payload.chapterId && p.sectionId === action.payload.sectionId)
          ),
          action.payload,
        ],
      };
    case 'COMPLETE_SECTION':
      return {
        ...state,
        progress: [
          ...state.progress,
          {
            chapterId: action.payload.chapterId,
            sectionId: action.payload.sectionId,
            completed: true,
            lastAccessed: new Date(),
          },
        ],
      };
    default:
      return state;
  }
}

const CourseContext = createContext<{
  state: CourseState;
  dispatch: React.Dispatch<CourseAction>;
} | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
} 