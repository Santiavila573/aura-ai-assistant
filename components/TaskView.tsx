import React from 'react';
import { Task } from '../types';
import { CheckIcon, ClipboardIcon } from './Icons';

interface TaskViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ tasks, onToggleTask }) => {
  return (
    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
      <h3 className="flex items-center text-lg font-semibold mb-3 text-purple-300">
        <ClipboardIcon />
        <span className="ml-2">Tus Tareas</span>
      </h3>
      {tasks.length === 0 ? (
         <p className="text-gray-400">¡No tienes tareas!</p>
      ) : (
        <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`w-6 h-6 mr-3 flex-shrink-0 rounded-md border-2 ${
                task.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-500'
              } flex items-center justify-center transition-colors`}
            >
              {task.completed && <CheckIcon />}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default TaskView;