# Credenciales de inicio de sesión:

**correo:**  bramora@gmail.com
**Contraseña:** brayan32

Puede marcar la casilla de "Recuérdame" para evitar tener que iniciar sesión nuevamente.

# Nota
Sabemos que por buenas practicas el .env no se versiona, pero para este caso lo hemos incluido para que pueda ejecutarlo sin problemas.

El modelo C4 de la segunda entrega está en la carpeta Documents al igual que el QAW.

# Requisitos funcionales de OurTask
## Equipo: 
- Santiago Campiño Tamayo
- Jhuly Andrea Vivas Vivas
- Jhojan Stiven Espinosa Montes
- Brayan David Maca Mancancela
- Juan José Saavedra Realpe
#

1. **Crear tarea:** Los usuarios deben poder crear nuevas tareas especificando al menos un título y fechas de inicio y finalización.

2. **Editar tarea:** Los usuarios deben poder editar el título y las fechas de inicio y finalización de una tarea existente.

3. **Eliminar tarea:** Los usuarios deben poder eliminar una tarea.

4. **Visualización de tareas:** La aplicación debe permitir a los usuarios ver todas las tareas disponibles, incluyendo su título, fechas de inicio y finalización.

5. **Asignación básica de tarea:** Se debe permitir asignar una tarea a un usuario específico, si bien puede ser una asignación básica sin opciones avanzadas de gestión de usuarios.

6. **Priorización de tareas:** Debe ser posible establecer una prioridad básica para las tareas, como alta, media o baja.

7. **Seguimiento básico del progreso:** Los usuarios deben poder marcar las tareas como completadas o no completadas, proporcionando una forma básica de seguimiento del progreso.

8. **Seguridad y acceso básico:** La aplicación debe tener un sistema de autenticación básico para garantizar que solo los usuarios registrados puedan acceder y gestionar las tareas.

9. **Interfaz de usuario intuitiva:** La interfaz de usuario debe ser simple e intuitiva para facilitar la creación, edición, visualización y eliminación de tareas.

10. **Persistencia de datos:** La aplicación debe ser capaz de almacenar las tareas creadas por los usuarios de forma persistente, por ejemplo, utilizando una base de datos básica.
### Requerimientos de autenticación

11. Los usuarios deberían poder iniciar sesión de forma segura utilizando sus credenciales.

12. El inicio de sesión debe interactuar con una base de datos para validar las credenciales del usuario.

13. El inicio de sesión debe comunicarse con una API para manejar las solicitudes de autenticación.

14. El sistema debe mostrar mensajes de error cuando las credenciales no sean válidas.

