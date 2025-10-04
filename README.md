# Aura-AI-Assistant
# Asistente Personal de Inteligencia Artificial con React
<br>
<img width="1594" height="804" alt="2025-10-02 16 21 14 (7)" src="https://github.com/user-attachments/assets/6769c272-00e7-4d30-9fca-085bea701731" />
<br>
<img width="1582" height="831" alt="2025-10-02 16 21 15" src="https://github.com/user-attachments/assets/3efd0ed1-1454-4467-8b62-cea96bc39dcd" />


📌 Descripción
Aura-AI-Assistant es una aplicación web desarrollada con React que actúa como un asistente personal basado en inteligencia artificial. Permite a los usuarios realizar preguntas sobre cualquier tema y recibir respuestas precisas, creativas y contextualizadas en tiempo real. El asistente se integra mediante una API key, lo que facilita su uso en diferentes plataformas o como aplicación independiente.
Con una interfaz intuitiva y moderna, Aura-AI-Assistant está diseñado para ser accesible tanto para usuarios finales como para desarrolladores que deseen integrarlo en sus propios proyectos.

✨ Características Principales
CaracterísticaDescripciónInterfaz con ReactFrontend dinámico y responsivo, construido con componentes reutilizables y hooks personalizados.Uso mediante API keyAutenticación segura para acceder al asistente desde cualquier aplicación.Respuestas versátilesCapacidad para responder preguntas sobre ciencia, tecnología, salud, programación, y más.Generación de contenidoCrea textos, resúmenes, correos, informes, y otros formatos según las necesidades del usuario.MultilingüeSoporte para múltiples idiomas, facilitando su uso global.Integración sencillaFácil de conectar a aplicaciones existentes mediante llamadas a la API.

🔧 Tecnologías Utilizadas
TecnologíaDescripciónReactBiblioteca para construir interfaces de usuario dinámicas y escalables.Node.js/ExpressBackend para manejar la lógica de negocio y las solicitudes a la API.OpenAI APIModelo de lenguaje para generar respuestas precisas y contextualizadas.AxiosBiblioteca para realizar llamadas HTTP a la API del asistente.CSS ModulesEstilos modulares para mantener el código limpio y organizado.

📂 Estructura del Proyecto

<img width="589" height="314" alt="image" src="https://github.com/user-attachments/assets/73ac05bf-e6bd-47da-8e04-86421d32a529" />


⚙️ Instalación y Configuración
1. Requisitos previos

Node.js (v18 o superior)
Cuenta en Aura-AI-Assistant para obtener tu API key

2. Clonar el repositorio
 Copygit clone https://github.com/Santiavila573/aura-ai-assistant
cd aura-ai-assistant/client
3. Instalar dependencias
 Copynpm install
4. Configurar la API key
Crea un archivo .env en la raíz del proyecto client/ y agrega tu API key:
 CopyREACT_APP_AURA_AI_API_KEY=tu_api_key_aqui
5. Ejecutar la aplicación
 Copynpm start

La aplicación estará disponible en http://localhost:3000.


🎯 Funcionalidades Clave

Interfaz de chat intuitiva: Diseñada con React para una experiencia de usuario fluida.
Respuestas en tiempo real: El asistente procesa las preguntas y genera respuestas al instante.
Exportación de conversaciones: Opción para guardar el historial de chat en formato de texto o PDF.
Personalización: Adapta las respuestas según el contexto y las preferencias del usuario.


📊 Ejemplo de Uso

Iniciar sesión: El usuario ingresa su API key (si es necesario).
Realizar una pregunta: Escribe su consulta en el chat (ej: "¿Cómo funciona el aprendizaje automático?").
Recibir respuesta: El asistente procesa la pregunta y devuelve una respuesta clara y detallada.
Guardar historial: Opcionalmente, el usuario puede exportar la conversación para referencia futura.


🔗 Integración con la API
Si deseas integrar Aura-AI-Assistant en tu propia aplicación, puedes hacerlo mediante llamadas HTTP a la API. Aquí tienes un ejemplo en JavaScript:
 Copyimport axios from 'axios';

const API_KEY = process.env.REACT_APP_AURA_AI_API_KEY;
const endpoint = "https://api.aura-ai-assistant.com/v1/chat";

const pregunta = "Explica la teoría de la relatividad de Einstein";

axios.post(endpoint, {
  prompt: pregunta,
  api_key: API_KEY
})
.then(response => {
  console.log("Respuesta del asistente:", response.data.respuesta);
})
.catch(error => {
  console.error("Error al consultar la API:", error);
});

📊 Ejemplo de Uso

Registro de datos: El usuario ingresa sus datos básicos (edad, peso, altura, objetivos). Selección de preferencias: Indica restricciones alimentarias, alergias o condiciones específicas. Generación del plan: El sistema genera un plan de alimentación personalizado. Exportación a PDF: El usuario puede descargar el plan en formato PDF con un solo clic.

📝 Contribuciones ¡Las contribuciones son bienvenidas! Para colaborar:

Abrir un issue con la propuesta. Crear un fork del repositorio. Enviar un pull request con los cambios.

📜 Licencia Este proyecto está bajo la licencia Apache 2.0. Consulta el archivo LICENSE para más detalles.

📬 Contacto

Autor: Santiago Avila
<br>
Correo: avilasantiago917@ngmail.com
<br>
Linkedin: https://www.linkedin.com/in/santiago-ávila-301047200
