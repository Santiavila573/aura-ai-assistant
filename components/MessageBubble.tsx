import React from 'react';
import { Message, Sender, Task } from '../types';
import TaskView from './TaskView';
import RecommendationCard from './RecommendationCard';

interface MessageBubbleProps {
  message: Message;
  onToggleTask: (taskId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> & { Loading: React.FC } = ({ message, onToggleTask }) => {
  const isUser = message.sender === Sender.User;

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-gradient-to-br from-purple-600 to-blue-500 rounded-t-2xl rounded-bl-2xl'
    : 'bg-gray-700 rounded-t-2xl rounded-br-2xl';

  return (
    <div className={`flex w-full ${containerClasses}`}>
      <div
        className={`max-w-lg lg:max-w-2xl px-5 py-3 shadow-md ${bubbleClasses}`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        {message.tasks && message.tasks.length > 0 && (
          <TaskView tasks={message.tasks} onToggleTask={onToggleTask} />
        )}
        {message.recommendations && message.recommendations.length > 0 && (
          <div className="mt-4 space-y-4">
            {message.recommendations.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingBubble: React.FC = () => (
    <div className="flex justify-start">
        <div className="max-w-lg lg:max-w-2xl px-5 py-3 rounded-t-2xl rounded-br-2xl shadow-md bg-gray-700">
            <div className="flex items-center space-x-2">
                <span className="sr-only">Loading...</span>
                <div className="h-2 w-2 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-purple-300 rounded-full animate-bounce"></div>
            </div>
        </div>
    </div>
);

MessageBubble.Loading = LoadingBubble;

export default MessageBubble;
