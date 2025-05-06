---

# ITKB Project

## Project Overview
ITKB is a web application project that consists of a backend service, a frontend service, and a MySQL database. This application is designed to be run in a Dockerized environment, simplifying setup and deployment. The architecture follows a microservices approach, utilizing Docker Compose to manage the services efficiently.

## Installation
To set up the ITKB project locally, ensure you have Docker and Docker Compose installed. Then, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.git
   cd itkb
   ```

2. Build and start the services:
   ```bash
   docker-compose up --build
   ```

The application will be accessible at:
- Backend: [http://localhost:9000](http://localhost:9000)
- Frontend: [http://localhost:3000](http://localhost:3000)

## Usage
Once the services are up and running, you can access the frontend through your browser at `http://localhost:3000`. The backend API can be accessed at `http://localhost:9000`. You can interact with the API using tools like Postman or directly from the frontend interface.

## Features
- **Backend**: RESTful API to manage application functionality.
- **Frontend**: Interactive user interface for seamless user experience.
- **Database**: MySQL database for persistent data storage.

## Dependencies
The project utilizes several Docker images as dependencies defined in the `docker-compose.yml` file:
- **Backend service**: Built from the Dockerfile located in the `./backend` directory.
- **Frontend service**: Built from the Dockerfile located in the `./frontend` directory.
- **Database**: MySQL version 8.0.

## Project Structure
```
ITKB/
├── backend/          # Directory containing backend source code and Dockerfile
│   ├── Dockerfile
│   └── (other backend files)
│
├── frontend/         # Directory containing frontend source code and Dockerfile
│   ├── Dockerfile
│   └── (other frontend files)
│
└── docker-compose.yml  # Configuration file to define and run multi-container Docker applications
```

## Environment Variables
The backend and database services utilize several environment variables for configuration. Below is a summary of critical variables defined in `docker-compose.yml`:

- Backend Service:
  - `DB_HOST`: Hostname of the database (default: `db`)
  - `DB_PORT`: Port number for the database (default: `3306`)
  - `DB_DATABASE`: Name of the database (default: `itkb`)
  - `DB_USERNAME`: Username to access the database (default: `root`)
  - `DB_PASSWORD`: Password for the database user (default: `rootpassword`)

- Database Service:
  - `MYSQL_ROOT_PASSWORD`: Password for the MySQL root user.
  - `MYSQL_DATABASE`: Name of the initial database to create.
  - `MYSQL_USER`: Username for the application to connect to the database.
  - `MYSQL_PASSWORD`: Password for the application database user.

Feel free to modify these environment variables according to your environment and preferences.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
