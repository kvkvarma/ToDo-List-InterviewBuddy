To-Do Application


This ToDo application is a full-stack project that allows users to manage their tasks effectively. It supports features such as adding, deleting, and updating tasks. The tasks are stored in a Supabase database, and the application is built using React for the frontend and Node.js with Express for the backend.


--> Features

Add Tasks: Users can add new tasks with descriptions.

Delete Tasks: Users can delete tasks from the list.

Update Tasks: Users can update the descriptions of existing tasks.

Real-Time Data Fetching: Updates to tasks are immediately reflected in the UI.


--> Technologies Used:

"Frontend"

React.js: Used for building the user interface.

Axios: For making HTTP requests to the backend.


"Backend"

Node.js: The runtime environment for server-side execution.

Express.js: A framework for building the RESTful API.

Supabase: For database management and operations.


"Database"

Supabase Database:

Table: todo

Columns:

id: Unique identifier for each task.

description: The task description.

timestampz: Timestamp for when the task was added.


"API Endpoints"

Backend Endpoints

GET /api/data

Fetches all tasks from the database, sorted by the timestampz column.

POST /addTask

Adds a new task to the database.

Request Body:

{
  "task": "Task Description"
}

DELETE /deleteTask/:refId

Deletes a task with the specified id.

PUT /updateTask/:id

Updates the description of a task with the specified id.