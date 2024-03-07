# Hack/Squat

Hack/Squat aims to be the workout app I've always wanted, but never had. As an Olympic lifter myself, data is the key to growth and many apps in this space provide some of the desired functionality, but tend to leave a lot on the table. I wanted to create a functional web app that provides the necessary functionality sought in a fitness tracking app with a few extras, minimizing the apps in my fitness tool chest. While the functionality has a ways to go, I'm getting it there. The web app design is a nod to my passion for software engineering and nostalgia for the older MSDos prompts I navigated as a young computer user. I opted for a modal heavy concept for seamless UX/UI that provides the framework for continuously building out existing features and adding to it in the future. I like building projects I would use myself and this one fits the mold.

# Live Link
https://hacksquat-1.onrender.com

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

[Feature List](https://github.com/RobotAnchovi/HackSquat/wiki/Features-List) | [Database Schema](https://github.com/RobotAnchovi/HackSquat/wiki/DB-SCHEMA) | [User Stories](https://github.com/RobotAnchovi/HackSquat/wiki/User-Story) | [Wireframes](https://github.com/RobotAnchovi/HackSquat/wiki/Wireframes)

# Landing Page

<img src="https://github.com/RobotAnchovi/HackSquat/assets/140855478/35153e51-9821-48f2-bd3b-473dbb82d82a" width="600px"/>

# Home Page

<img width="600px" src="https://github.com/RobotAnchovi/HackSquat/assets/140855478/93162bb0-a3d9-4967-a786-08417d497a07"/>

# Barbell Calculator

<img width="600px" src="https://github.com/RobotAnchovi/HackSquat/assets/140855478/ac5ff68e-6f29-40fe-91d2-f5d9e557379e"/>

# Exercise List

<img width="600px" src="https://github.com/RobotAnchovi/HackSquat/assets/140855478/e915cf65-9ebf-492e-9a85-a86326863615"/>

# User Profile

<img width="600px" src="https://github.com/RobotAnchovi/HackSquat/assets/140855478/e0558a87-c416-48b5-a753-2c8cc36b0690"/>

# Endpoints
## Auth
| Request                        | Purpose                
| :----------------------------- | :--------------------: |
| GET /api/auth/        | This fetch is sent upon initial app load and on subsequent refreshes.<br>It returns an object representing the current user, if user is logged in. |
| POST /api/auth/unauthorized      | This endpoint will be routed to in the case that a protected route does not pass validations for the current user.<br>It returns an object with an errors property, which is an array with the value 'Unauthorized' |
| POST /api/auth/signup        | This fetch sends the form data signup from data to the backend to process the creation of a new user.<br>It returns an object representing the current user, after logging them in, if account creation succeeds.                                 |
| POST /api/auth/login | This fetch attempts to login a user with the provided credentials.<br>It returns an object representing the current user, if validation succeeds.|                                                                    
| POST /api/auth/logout | This fetch will logout the current user.<br>It returns an object with the message 'User logged Out' if it succeeds.|

## Exercises
| Request                        | Purpose                
| :----------------------------- | :--------------------: |
| POST /api/exercises | Creates a new exercise entity in the database. This route requires the client to be authenticated. It uses form data to populate the exercise fields such as name, description, category, and visibility (public/private). If the form validation passes, the new exercise is added to the database and a success response with the exercise data is returned. Otherwise, it returns an error response.
| GET /api/exercises/<int:exercise_id> | Fetches the details of a single exercise specified by its ID. This route checks if the exercise exists; if it does, the exercise's details are returned as JSON. If the exercise is not found, it returns an error response indicating that the exercise was not found.
| GET /api/exercises | etrieves a list of all exercises that are either created by the current authenticated user or marked as public. It orders the exercises by category and then by name. The exercises are returned as a list of JSON objects.
| PUT /api/exercises/<int:exercise_id> | Updates an existing exercise specified by its ID. It checks if the current user is authorized to update the exercise by comparing the user ID of the exercise with the ID of the current user. If the user is authorized and the form validation passes, it updates the exercise's details in the database and returns the updated exercise data. If there's a form validation error, it returns an error response.
| DELETE   /api/exercises/<int:exercise_id> | Deletes an exercise specified by its ID. Similar to the update route, it first checks if the current user is authorized to delete the exercise. If the user is authorized, it deletes the exercise from the database and returns a success message. If not authorized, it returns an error response indicating that the user is unauthorized.
## Workout Plans
| Request                        | Purpose                
| :----------------------------- | :--------------------: |
| POST /api/workout-plans | Creates a new workout plan. This typically involves receiving data such as the plan's name, description, and any specific attributes related to the workout plan. The plan is then saved to the database, and details of the newly created plan are returned.|
| DELETE /api/workout-plans/user/<int:user_id>/<int:plan_id>  | Deletes a specific workout plan belonging to a given user, identified by user_id and the plan's unique plan_id. It ensures that only the owner or an authorized user can delete the plan. |
| GET /api/workout-plans/user/<int:user_id> | Retrieves all workout plans created by a specific user. This route is used to list a user's workout plans, allowing them to manage or select from their existing plans. |
| GET /api/workout-plans/user/<int:user_id>/<int:plan_id> | Fetches the details of a specific workout plan owned by a user. This includes all information about the plan, such as its exercises, schedule, goals, etc. |
| PUT /api/workout-plans/user/<int:user_id>/<int:plan_id> | Updates a specific workout plan owned by a user. This route allows for modifications to the plan's details, like its name, description, associated exercises, or any other editable attribute of the plan. |

## Workouts
| Request                        | Purpose                
| :----------------------------- | :--------------------: |
| POST /api/workouts/ | Creates a new workout session as part of a workout plan. This might include information such as the workout's date, the exercises to be performed, and any specific goals for the session. |
| DELETE /api/workouts/<int:workout_id> | Deletes a specific workout session, identified by workout_id. This allows users to manage their workout sessions effectively by removing those that are no longer relevant or were created in error. |
| GET /api/workouts/<int:workout_id> | Fetches detailed information about a specific workout session. This includes the list of exercises, the workout's objectives, and any progress notes. |
| GET /api/workouts/user/<int:user_id> | Retrieves a list of all workouts created by a specific user. This is useful for tracking progress over time and managing workout schedules. |
| PUT /api/workouts/<int:workout_id> | Updates the details of an existing workout session. Changes could involve modifying the workout's date, adjusting the exercises included, or updating the workout's goals. |

## Workout Exercises
| Request                        | Purpose                
| :----------------------------- | :--------------------: |
| POST /api/workout-exercises/ | Adds a new exercise to a workout. This involves specifying the details of the exercise, such as name, repetitions, sets, and linking it to a specific workout. |
| DELET /api/workout-exercises/<int:workout_exercise_id> | Adds a new exercise to a workout. This involves specifying the details of the exercise, such as name, repetitions, sets, and linking it to a specific workout. |
| GET /api/workout-exercises/workout/<int:workout_id>/exercises | Retrieves all exercises associated with a particular workout, identified by workout_id. This can be used to display or review the exercises that make up a workout session. |
| PUT /api/workout-exercises/<int:workout_exercise_id> | Updates the details of a specific exercise within a workout. This could include changing the number of sets, repetitions, or the exercise itself. |

# Feature List

1. Exercise Database
2. Workout Plans
3. Workouts
4. Barbell Calculator

# Future Implementation Goals

1. Comprehensive Nutrition Feature (for planning macros)
2. Progress Tracking with notifications for deload periods
3. Chat integration with websockets for a Trainer/Client communication interface
4. Better workout integration with Drag and Drop features

# Connect

[LinkedIn](https://www.linkedin.com/in/whitlockjdev/)
