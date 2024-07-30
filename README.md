# WingSpan - Flight Tracking Application

![Demo](https://github.com/DarkNorth9999/DarkNorth9999-WingSpan-Network-Frontend/blob/0e997518f5c2c53cc2d5ef41b0839fba5480c48f/WingSpan.gif)

WingSpan Network is a real-time flight tracking application with live notification on flight updates like delays, gate changes, cancellations, and more.

## Architecture

![Architecture](https://github.com/DarkNorth9999/WingSpan-Network/blob/ca763a9219f8e7fb23b3de0cd5a1e1d196f72b9d/ArchitectureDiagram.png)

## Use Case Diagram

![UseCaseDiagram](https://github.com/DarkNorth9999/WingSpan-Network/blob/ca763a9219f8e7fb23b3de0cd5a1e1d196f72b9d/UseCaseDiagram.png)

## Features

- **Real-time Flight Tracking**: Allows users to search and track flight status in real time, including departure and arrival times, gate information, and any delays or cancellations.

- **Live-Updates**: Allows users to receive updates about their flights on their Email and SMS as per their comfort

- **Clean UI**: A clean UI to make it super simple for the user to find what he needs

## Technology Stack

### Frontend

- **Typescript**
- **React**
- **Tailwind CSS**
- **Shadcn library**

- **Developer Note**: Created a Clean Project Structure along with best practices like defining single instance of axios for API calls (intercepter), using environment variables, doing manual feature testing and more

### Real-Time Notifications

Utilized asynchronous programming to create a single runnable main.py file (for backend, except kafka deployment on docker) for kafka consumer and a thread which wakes up every unit of specified time (otherwise sleeping) to perform any update check, if updates are found they are produced as records in kafka queue which are consumed (one record for each flight) and communicated to respective users by their chosen means

The thread checks every 2 hours for flights that were updated atleast 5 hours ago, unless they have a close departure time, it ignores the other flight uptill the next sleep cycle is over

### Backend

- **Python**: Implemented MVC Architecture, with controllers being FastAPI routes which talk with services, where the business logic is handled, services talk with repositories who have access to models where they can interact with our database.

- **FastAPI**
- **PostgreSQL**: Structured + Robust Database
- **SQLAlchemy**: Library for ORM
- **Kafka**: Deployed using Docker Compose, used for consumption of notifications

- **Twilio**: For SMS Notifications
- **Brevo**: For Email Notifications

### Architecture

- **MVC Architecture**: The application follows the Model-View-Controller (MVC) architecture, enhancing code maintainability and scalability.
- **RESTful API**: Develops a RESTful API design for effective communication between the client and server using HTTP methods.
- **Service Layer**: Incorporates a service layer for business logic, reducing the complexity in the API endpoint functions.

### Deployment

- **Docker**: Dockerized Kafka, Zookeeper and Kafka UI

## Getting Started

To set up and run WingSpan locally, follow these steps:

```bash
# Clone the repository
git clone git@github.com:DarkNorth9999/DarkNorth9999-WingSpan-Network-Frontend.git

cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev


cd backend

# Install dependencies
pip install -r requirements.txt

# Start the backend
python main.py

```
