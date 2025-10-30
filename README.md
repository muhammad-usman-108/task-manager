

### Setup and Install
1. Docker
2. Node

### Inital Random 20 records
I added DataInitializer to add the random 20 records so user can see something on the UI when the application is loaded on the browser.

### To run the backend:
1. Navigate to backend folder.
2. Run the command `docker compose up --build`
3. The docker container have everything like database and backend Restful API service.

### API endpoints: 
GET http://localhost:8080/api/tasks?page=0&size=10   ---> return first 10 records
GET http://localhost:8080/api/tasks?page=1&size=10   ---> return next 10 records

POST curl -X POST http://localhost:8080/api/tasks -H "Content-Type: application/json" -d "{\"name\":\"JIRA Task\",\"description\":\"Complete the sprint as soon as possible\",\"status\":\"Pending\"}"

PUT curl -X POST http://localhost:8080/api/tasks/1 -H "Content-Type: application/json" -d "{\"name\":\"JIRA Task\",\"description\":\"Complete the sprint as soon as possible\",\"status\":\"Pending\"}"

DELETE curl -X POST http://localhost:8080/api/tasks/1

### To run the frontend:
1. Navigate to frontend folder.
2. Run the command to install the node packages `npm install`
3. Run the project by `npm run dev`
