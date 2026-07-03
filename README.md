# Task Manager - Prueba Técnica Supervisa

CRUD de gestión de tareas hecho para la prueba técnica de Supervisa (cargo Ingeniero en formación).

## Qué usé

**Backend:**
- Node.js + Express
- SQLite (uso el módulo `node:sqlite` que ya viene con Node, no toca instalar nada aparte)
- Clean Architecture (separé el proyecto en capas: domain, application e infrastructure)

**Frontend:**
- React + Vite
- CSS normal, sin librerías de UI
- lucide-react para los íconos

## Por qué Clean Architecture

Quise separar bien la lógica de negocio de los detalles técnicos (Express, SQLite, etc). La idea es que si mañana toca cambiar de base de datos o de framework, no tenga que tocar toda la app, solo la parte de infraestructura.

Quedó organizado así:
- `domain/`: la entidad Task con las validaciones (título obligatorio, máximo de caracteres, etc.) y la interfaz del repositorio
- `application/`: los casos de uso (crear, listar, buscar por id, actualizar, eliminar)
- `infrastructure/`: la conexión a SQLite, los controllers y las rutas de Express

En el frontend apliqué la misma idea pero más simple: `domain/` para el shape de los datos y constantes, `infrastructure/api/` para las llamadas al backend, y `ui/` (components, hooks, pages) para todo lo visual.

## Cómo correrlo

Necesitas Node 22 o más nuevo (por lo del `node:sqlite`).

**Backend:**
```bash
cd backend
npm install
npm start
```
Corre en `http://localhost:3000`. La base de datos se crea sola la primera vez que lo corres, no hay que configurar nada.

**Frontend** (en otra terminal):
```bash
cd frontend
npm install
npm run dev
```
Corre en `http://localhost:5173`. Ojo: el backend tiene que estar corriendo también para que funcione, si no el frontend no va a tener de dónde traer los datos.

## Endpoints

- `POST /api/tasks` → crear tarea
- `GET /api/tasks` → listar tareas (le puedes mandar `?status=` y/o `?priority=` para filtrar)
- `GET /api/tasks/:id` → traer una tarea específica
- `PUT /api/tasks/:id` → editar tarea
- `DELETE /api/tasks/:id` → eliminar tarea

## Qué hace la app

- Crear tareas con título (obligatorio y único), descripción, fecha de vencimiento, prioridad y estado
- Ver la lista de tareas y filtrarlas por prioridad
- Marcar como completada con un click en el checkbox (se tacha el título y baja la opacidad de la tarjeta)
- Editar y eliminar tareas
- Un contador que muestra en tiempo real cuánto falta para que venza la tarea (días, horas, minutos, segundos)
- Validaciones tanto en el frontend como en el backend (por ejemplo, no deja crear dos tareas con el mismo título)

## Bugs que me tocó resolver (y cómo)

Dejo esto porque me pareció bueno documentarlo:

- **Zona horaria en las fechas de vencimiento**: al principio, una fecha como "3 de julio" se marcaba como vencida antes de tiempo, porque `new Date("2026-07-03")` la interpreta en UTC, y Colombia está 5 horas atrás. Lo resolví con una función `parseLocalDate` que arma la fecha con año/mes/día directamente, sin pasar por la conversión UTC.
- **Update fallando en SQLite**: el método `update()` del repositorio le mandaba a la base de datos más campos de los que la consulta SQL esperaba (`origin_framework`, `user_email`), y `node:sqlite` es estricto con eso. Lo arreglé armando un objeto con solo los campos que la consulta realmente necesita.

## Notas

El campo `user_email` lo dejé fijo por ahora, porque la prueba no pedía sistema de login, así que no armé autenticación.

---
Daniel Vargas