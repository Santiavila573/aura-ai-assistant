import { Task, UserPreferences } from '../types';

const TASKS_KEY = 'virtual-assistant-tasks';
const PREFERENCES_KEY = 'virtual-assistant-preferences';


export const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from local storage:", error);
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to local storage:", error);
  }
};

export const loadPreferencesFromStorage = (): UserPreferences => {
  try {
    const storedPreferences = localStorage.getItem(PREFERENCES_KEY);
    return storedPreferences ? JSON.parse(storedPreferences) : {};
  } catch (error) {
    console.error("Failed to load preferences from local storage:", error);
    return {};
  }
};

export const savePreferencesToStorage = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error("Failed to save preferences to local storage:", error);
  }
};