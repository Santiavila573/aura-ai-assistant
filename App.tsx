import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Message, Task, Recommendation, Sender, Intent, UserPreferences } from './types';
import { analyzeUserRequest } from './services/openaiService';
import { loadTasksFromStorage, saveTasksToStorage, loadPreferencesFromStorage, savePreferencesToStorage } from './services/localStorageService';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const assistantName = "Aura AI";

  useEffect(() => {
    setTasks(loadTasksFromStorage());
    setUserPreferences(loadPreferencesFromStorage());
    setMessages([
      {
        id: Date.now(),
        sender: Sender.Assistant,
        text: `¡Hola! Soy ${assistantName}, tu asistente personal. ¿Cómo puedo ayudarte hoy? Puedes pedirme que agregue una tarea, que te muestre tus tareas o que te recomiende una película, un libro o una receta.`,
      },
    ]);
  }, []);

  const processAssistantResponse = useCallback((response: any) => {
    let assistantMessage: Message = {
      id: Date.now(),
      sender: Sender.Assistant,
      text: "No estoy segura de cómo procesar eso. ¿Podrías intentar reformularlo?",
    };

    switch (response.intent) {
      case Intent.CREATE_TASK:
        if (response.task && response.task.title) {
          const newTask: Task = {
            id: `task-${Date.now()}`,
            title: response.task.title,
            completed: false,
          };
          const updatedTasks = [...tasks, newTask];
          setTasks(updatedTasks);
          saveTasksToStorage(updatedTasks);
          assistantMessage.text = response.chatResponse || `He añadido "${newTask.title}" a tus tareas.`;
        }
        break;

      case Intent.READ_TASKS:
        assistantMessage.text = response.chatResponse;
        assistantMessage.tasks = tasks;
        break;

      case Intent.UPDATE_TASK:
        if (response.task && response.task.id) {
            const taskToUpdate = tasks.find(t => t.id === response.task.id);
            if (taskToUpdate) {
                const updatedTasks = tasks.map(t => t.id === taskToUpdate.id ? { ...t, completed: true } : t);
                setTasks(updatedTasks);
                saveTasksToStorage(updatedTasks);
                assistantMessage.text = response.chatResponse || `He marcado "${taskToUpdate.title}" como completada.`;
            } else {
                 assistantMessage.text = `No pude encontrar la tarea que mencionaste para actualizar.`;
            }
        } else {
            assistantMessage.text = response.chatResponse || "No especificaste qué tarea marcar como completada.";
        }
        break;

      case Intent.DELETE_TASK:
         if (response.task && response.task.id) {
            const taskToDelete = tasks.find(t => t.id === response.task.id);
             if (taskToDelete) {
                const updatedTasks = tasks.filter(t => t.id !== taskToDelete.id);
                setTasks(updatedTasks);
                saveTasksToStorage(updatedTasks);
                assistantMessage.text = response.chatResponse || `He eliminado "${taskToDelete.title}" de tu lista.`;
            } else {
                 assistantMessage.text = `No pude encontrar la tarea que querías eliminar.`;
            }
        } else {
            assistantMessage.text = response.chatResponse || "No especificaste qué tarea eliminar.";
        }
        break;

      case Intent.RECOMMENDATION:
        if (response.recommendations && response.recommendations.length > 0) {
            assistantMessage.text = response.chatResponse;
            assistantMessage.recommendations = response.recommendations;
        }
        break;
      
      case Intent.UPDATE_PREFERENCES:
        if (response.preference && response.preference.type && response.preference.query) {
          const { type, query } = response.preference;
          const updatedPreferences = { ...userPreferences, [type]: query };
          setUserPreferences(updatedPreferences);
          savePreferencesToStorage(updatedPreferences);
          assistantMessage.text = response.chatResponse || `¡Entendido! Recordaré que te gustan ${type}s con ${query}.`;
        }
        break;

      case Intent.CHAT:
      default:
        assistantMessage.text = response.chatResponse;
        break;
    }
    
    setMessages(prev => [...prev, assistantMessage]);

  }, [tasks, userPreferences]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: Sender.User,
      text: text,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const currentTasks = loadTasksFromStorage();
      const currentPrefs = loadPreferencesFromStorage();
      const response = await analyzeUserRequest(text, currentTasks, currentPrefs);
      processAssistantResponse(response);
    } catch (error) {
      console.error("Error processing user request:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: Sender.Assistant,
        text: "Lo siento, estoy teniendo problemas para conectarme a mi cerebro en este momento. Por favor, inténtalo de nuevo más tarde.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [processAssistantResponse]);
  
  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);

    // Also update the message that contains the task list
    setMessages(prevMessages => prevMessages.map(msg => {
        if(msg.tasks) {
            return { ...msg, tasks: updatedTasks };
        }
        return msg;
    }));
  };


  return (
    <div className="flex flex-col h-screen font-sans text-white bg-transparent">
      <header className="bg-black/20 backdrop-blur-md p-4 border-b border-white/10 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {assistantName}
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          toggleTask={toggleTask}
        />
      </main>
    </div>
  );
};

export default App;