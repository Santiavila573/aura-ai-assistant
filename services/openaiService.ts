import OpenAI from 'openai';
import { Task, UserPreferences } from '../types';

const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("VITE_OPENAI_API_KEY environment variable is not set");
}

const openai = new OpenAI({
    apiKey: (import.meta as any).env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const responseSchema = {
    type: "object",
    properties: {
        intent: {
            type: "string",
            enum: ['CREATE_TASK', 'READ_TASKS', 'UPDATE_TASK', 'DELETE_TASK', 'RECOMMENDATION', 'UPDATE_PREFERENCES', 'CHAT'],
            description: "La intención principal del usuario."
        },
        task: {
            type: "object",
            properties: {
                id: { type: "string", description: "El ID único de la tarea a actualizar o eliminar." },
                title: { type: "string", description: "El título de la tarea a crear." },
            },
            description: "Detalles de la tarea. Se utiliza para las intenciones de crear, actualizar y eliminar."
        },
        preference: {
            type: "object",
            properties: {
                type: { type: "string", enum: ['book', 'movie', 'recipe'], description: "El tipo de preferencia a actualizar." },
                query: { type: "string", description: "La preferencia específica del usuario (ej. 'ciencia ficción', 'comedia', 'vegetariana')." }
            },
            description: "Detalles de la preferencia del usuario. Se usa solo con la intención UPDATE_PREFERENCES."
        },
        recommendations: {
            type: "array",
            description: "Una lista de recomendaciones para el usuario. Puede estar vacía si no se piden recomendaciones.",
            items: {
                type: "object",
                properties: {
                    type: { type: "string", enum: ['book', 'movie', 'recipe'], description: "El tipo de recomendación." },
                    title: { type: "string", description: "El título del elemento recomendado." },
                    description: { type: "string", description: "Una breve descripción del elemento recomendado." },
                },
            }
        },
        chatResponse: {
            type: "string",
            description: "Una respuesta amigable y conversacional para el usuario. Debe resumir la acción realizada o responder a una pregunta general."
        },
    },
    required: ['intent', 'chatResponse']
};

export const analyzeUserRequest = async (userInput: string, tasks: Task[], preferences: UserPreferences): Promise<any> => {
    const model = "gpt-4o";
    const taskListString = tasks.length > 0
        ? `Aquí está la lista actual de tareas (incluyendo su ID único): ${JSON.stringify(tasks)}.`
        : "El usuario no tiene tareas actualmente.";

    const preferencesString = Object.keys(preferences).length > 0
        ? `El usuario ha expresado las siguientes preferencias: ${JSON.stringify(preferences)}.`
        : "El usuario no ha expresado ninguna preferencia todavía.";

    const systemInstruction = `Eres un asistente personal amigable y servicial llamado Aura.
    Analiza la solicitud del usuario y determina su intención. Tu objetivo principal es gestionar una lista de tareas y proporcionar recomendaciones personalizadas.
    ${taskListString}
    ${preferencesString}

    - Para CREATE_TASK: El usuario quiere añadir una nueva tarea. Extrae el título de la tarea y colócalo en 'task.title'.
    - Para READ_TASKS: El usuario quiere ver sus tareas actuales. La respuesta del chat (chatResponse) debería listarlas.
    - Para UPDATE_TASK y DELETE_TASK: El usuario quiere modificar o eliminar una tarea. Analiza la petición del usuario y la lista de tareas para identificar la tarea correcta. El usuario puede usar un lenguaje impreciso, cometer errores tipográficos o referirse a la tarea por su contenido. Tu trabajo es encontrar la coincidencia más probable. Una vez encontrada, **debes devolver el 'id' único de esa tarea en el campo 'task.id'**.
    - Para UPDATE_PREFERENCES: El usuario está expresando un gusto o preferencia sobre un tipo de libro, película o receta (ej. "me gustan las películas de ciencia ficción"). Extrae el tipo ('movie', 'book', 'recipe') y la consulta ('ciencia ficción') y ponlos en el objeto 'preference'. La respuesta del chat debe confirmar que has guardado la preferencia.
    - Para RECOMMENDATION: El usuario está pidiendo una o más sugerencias. **Usa las preferencias conocidas del usuario para hacer una recomendación altamente relevante y personalizada.** Genera recomendaciones creativas y ponlas todas en el array 'recommendations'. Si no tienes preferencias para una categoría, haz una recomendación popular.
    - Para CHAT: Esto es para conversaciones generales, saludos o preguntas no relacionadas con tareas o recomendaciones. Cuando el usuario pida recetas de cocina o preparación de alimentos, proporciona respuestas detalladas y completas que incluyan: lista completa de ingredientes con cantidades específicas, instrucciones paso a paso detalladas, tiempo de preparación y cocción, consejos útiles, variaciones posibles, y cualquier información nutricional relevante si es apropiada.

    Siempre proporciona una respuesta de chat (chatResponse) amigable y en español. Para las operaciones de tareas o preferencias, la respuesta del chat debe confirmar la acción. Para consultas sobre recetas, asegúrate de que la respuesta sea lo más completa y útil posible.
    Tu salida completa debe estar en formato JSON que coincida con el esquema proporcionado: ${JSON.stringify(responseSchema)}`;

    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: userInput }
            ],
            response_format: { type: "json_object" }
        });

        const jsonText = response.choices[0].message.content.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("OpenAI API call failed:", error);
        throw new Error("No se pudo obtener una respuesta del asistente.");
    }
};