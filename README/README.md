## HackSquat

## Table of Contents

1. [Database Schema](#database-schema)
2. [Workout Planning and Scheduling](#workout-planning-and-scheduling)
3. [Tracking and Analysis](#tracking-and-analysis)
4. [Nutritional Guidance](#nutritional-guidance)
5. [Additional Features](#additional-features)
6. [Technical Considerations](#technical-considerations)
7. [Development Strategy](#development-strategy)
8. [Dashboards](#dashboards)
9. [API Documentation](#api-documentation)
   - [User Authentication/Authorization](#user-authenticationauthorization)
     - [User Signup](#user-signup)
     - [User Login](#user-login)
     - [Get User Profile](#get-user-profile)
     - [Update User Profile](#update-user-profile)
     - [Delete User Account](#delete-user-account)
   - [Workout Plans Management](#workout-plans-management)
     - [Create Workout Plan](#create-workout-plan)
     - [View All Workout Plans](#view-all-workout-plans)
     - [Get Workout Plan Details](#get-workout-plan-details)
     - [Update Workout Plan](#update-workout-plan)
     - [Delete Workout Plan](#delete-workout-plan)
   - [Exercises Management](#exercises-management)
     - [Add New Exercise to a Workout Plan](#add-new-exercise-to-a-workout-plan)
     - [View Exercises Within a Workout Plan](#view-exercises-within-a-workout-plan)
     - [Update Exercise Details](#update-exercise-details)
     - [Remove Exercise from a Workout Plan](#remove-exercise-from-a-workout-plan)
   - [Nutritional Targets Management](#nutritional-targets-management)
     - [Set Nutritional Targets](#set-nutritional-targets)
     - [View Nutritional Targets](#view-nutritional-targets)
     - [Update Nutritional Targets](#update-nutritional-targets)
     - [Reset Nutritional Targets](#reset-nutritional-targets)
   - [Workout Progress and Analytics Management](#workout-progress-and-analytics-management)
     - [Read Progress and Analytics](#read-progress-and-analytics)
     - [Update Workout Details](#update-workout-details)
     - [Delete Workout Session](#delete-workout-session)

### Database Schema

![Database Schema](/wireframes/Hack-Squat-DB.png)

### 1. **Workout Planning and Scheduling**

- **Data Model**: I’ll need a robust data model to store workouts, exercises, and user schedules. Consider `PostgreSQL` as it offers strong relational data handling.
- **User Interface**: A drag-and-drop interface for planning workouts could enhance user experience. Implement this with React, utilizing libraries like `react-beautiful-dnd` for a smooth, intuitive UI.

### 2. **Tracking and Analysis**

- **Lift Progression Logic**: Implement algorithms that analyze past performance and automatically suggest weight increments. This could be based on simple percentage increases or more complex formulas considering the user's rate of progress, workout intensity, and frequency.
- **Dashboard**: Use React to create dynamic, real-time dashboards. Libraries like `Recharts` or `Chart.js` can visualize lift history, progress over time, and comparisons between different exercises.

### 3. **Nutritional Guidance**

- **API Integration**: Consider integrating a third-party API for nutritional data to provide accurate caloric intake and macronutrient targets. I could build a basic nutrition calculator based on body measurements and fitness goals.
- **User Profile Customization**: Allow users to input specific goals, dietary restrictions, and preferences to tailor the nutritional guidance to their needs.

### 4. **Additional Features**

- **Barbell Calculator**: A simple `JavaScript` calculator function can help users quickly determine the plates needed for a given weight. This feature enhances the user's gym experience by simplifying setup times.
- **Notification System**: Implement a notification system using Web Push Notifications to alert users about missed targets or suggest deload periods. This could be based on tracking workout performance and applying logic to determine when a user consistently falls short of their targets.

### Technical Considerations

- **Frontend**: Since I’m familiar with `React, Redux, and Vite`, these tools will serve well for building a responsive, state-managed UI. Consider using `Tailwind CSS` or Styled Components for efficient, maintainable styling.
- **Backend**: For the server side, `Flask with PostgrSql` provides a flexible, scalable foundation. I can structure my API to handle user authentication, data management, and business logic for workout and nutrition calculations.
- **Document Storage**: For storing user-uploaded images or videos, I'm using a cloud storage service, `AWS S3`. This ensures efficient, scalable storage and easy access to media files.
- **Deployment**: Deploying on `Render` for the frontend, with `PostgreSQL` service for my database. Ensure secure HTTPS connections and consider using `Docker` for easier deployment and scalability.

### Development Strategy

- **MVP (Minimum Viable Product)**: Start with core features (workout tracking, basic nutritional guidance) and iteratively add more complex functionalities (automatic lift progression, detailed analytics).
- **User Testing**: Early and continuous user feedback is crucial. Implement user testing phases to gather insights and adjust my app accordingly.
- **Agile Development**: Adopt an `agile development methodology`, breaking down the project into sprints with specific goals. This approach helps manage the project's scope and ensures steady progress.

Dashboards

### 1. **Workout Planning and Design Dashboard**

- **Exercise Library**: Ensure I have a diverse and comprehensive library of exercises that users can choose from. This library could include categorizations such as muscle group, equipment needed, and difficulty level.
- **Template Workouts**: Offer pre-designed workout templates for various goals (e.g., strength, hypertrophy, endurance) to help users get started or provide inspiration.
- **Customization**: Allow for high customization of workouts, including the ability to add notes or special instructions for each exercise, which can be useful for users with specific needs or injuries.

### 2. **Workout Tracker**

- **Rest Timer**: Incorporate a rest timer feature that users can start after completing a set. This helps users stick to their rest interval plans without needing a separate timer.
- **Feedback System**: After completing a workout session, prompt users to input how the session felt (e.g., too easy, just right, too hard). Use this feedback to adjust future workout suggestions or weight targets.
- **Social Sharing**: Consider adding functionality for users to share their workouts or achievements on social media. This can add a motivational aspect and community feel.

### 3. **User Dashboard**

- **Goal Setting and Tracking**: Allow users to set specific fitness goals (e.g., reach a certain weight for a lift, achieve a body weight target) and track their progress toward these goals.
- **Integration with Wearables**: If possible, consider integrating with fitness wearables or apps to pull in additional data like daily activity, heart rate, or sleep patterns, which can provide a more holistic view of the user's health and fitness.
- **Recovery Insights**: Based on workout intensity and frequency, provide insights or recommendations on recovery, including suggested rest days or lighter workout periods to prevent overtraining.

### Additional Considerations

- **Accessibility Features**: Ensure your app is accessible to a wide range of users, including those with disabilities. This could involve screen reader compatibility, high-contrast modes, and scalable text.
- **Community Features**: Adding a community aspect, like forums, workout challenges, or leaderboards, can significantly enhance user engagement and retention.
- **Educational Content**: Incorporate articles, videos, or tips on proper form, nutrition, recovery strategies, and other relevant topics to provide value beyond just workout tracking.

### Technical and Design Considerations

- **Responsive Design**: Ensure the app is fully responsive and provides a seamless experience across all devices (desktop, tablet, smartphone).
- **Data Privacy and Security**: Given the personal nature of the data the app will handle, prioritize strong security measures and transparent privacy policies to protect user information.

## API Documentation

### USER AUTHENTICATION/AUTHORIZATION

#### Endpoints requiring proper authorization

- **Require Authentication Response:**

  - Status Code: 401
  - Body:
    ```json
    {
      "message": "Authentication required"
    }
    ```

- **Require Proper Authorization Response:**
  - Status Code: 403
  - Body:
    ```json
    {
      "message": "Forbidden"
    }
    ```

### User Signup

- **Endpoint:** POST `/api/users/signup`
- **Description:** Registers a new user.
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password",
    "username": "johndoe",
    "full_name": "John Doe"
  }
  ```
- **Success Response:** 201 Created
  - Body:
    ```json
    {
      "user_id": "unique-user-id",
      "email": "user@example.com",
      "username": "johndoe",
      "full_name": "John Doe",
      "created_at": "timestamp",
      "message": "User successfully created."
    }
    ```

### User Login

- **Endpoint:** POST `/api/users/login`
- **Description:** Authenticates a user and returns a token.
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "token": "auth-token",
      "user_id": "unique-user-id",
      "message": "Login successful."
    }
    ```

### Get User Profile

- **Endpoint:** GET `/api/users/profile`
- **Description:** Retrieves the profile of the currently logged-in user.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "user_id": "unique-user-id",
      "email": "user@example.com",
      "username": "johndoe",
      "full_name": "John Doe",
      "created_at": "timestamp",
      "last_login": "timestamp",
      "profile": {
        // Additional user profile information here
      }
    }
    ```

### Update User Profile

- **Endpoint:** PUT `/api/users/profile`
- **Description:** Updates user profile information.
- **Require Authentication:** Yes
- **Body:**
  ```json
  {
    "full_name": "New Name",
    "password": "newpassword" // Optional
    // Additional fields to update
  }
  ```
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Profile updated successfully."
    }
    ```

### Delete User Account

- **Endpoint:** DELETE `/api/users/{user_id}`
- **Description:** Deletes a user account.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "User account deleted successfully."
    }
    ```

### Workout Plans Management

#### Create Workout Plan

- **Endpoint:** POST `/api/workout-plans`
- **Description:** Allows users to create a new workout plan with specific details.
- **Body:**

  ```json
  {
    "name": "Plan Name",
    "description": "Plan Description"
    // Additional details like phases, lift days, exercises per day can be included as needed.
  }
  ```

- **Require Authentication:** Yes
- **Success Response:** 201 Created
  - Body:
    ```json
    {
      "plan_id": "unique-plan-id",
      "message": "Workout plan created successfully."
    }
    ```

#### View All Workout Plans

- **Endpoint:** GET `/api/workout-plans/user/{user_id}`
- **Description:** Retrieves all workout plans created by a specific user.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    [
      {
        "plan_id": "unique-plan-id",
        "name": "Plan Name",
        "description": "Plan Description",
        "created_at": "timestamp",
        "updated_at": "timestamp"
        // Additional plan details as necessary.
      }
      // Additional plans
    ]
    ```

#### Get Workout Plan Details

- **Endpoint:** GET `/api/workout-plans/{plan_id}`
- **Description:** Retrieves details of a specific workout plan.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "plan_id": "unique-plan-id",
      "user_id": "user-unique-id",
      "name": "Plan Name",
      "description": "Plan Description",
      "created_at": "timestamp",
      "updated_at": "timestamp"
      // Additional plan details as needed.
    }
    ```

#### Update Workout Plan

- **Endpoint:** PUT `/api/workout-plans/{plan_id}`
- **Description:** Updates details of an existing workout plan.
- **Body:**
  ```json
  {
    "name": "Updated Plan Name",
    "description": "Updated Description"
    // Additional fields that can be updated.
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Workout plan updated successfully."
    }
    ```

#### Delete Workout Plan

- **Endpoint:** DELETE `/api/workout-plans/{plan_id}`
- **Description:** Deletes a specific workout plan.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Workout plan deleted successfully."
    }
    ```

### Exercises Management

#### Add New Exercise to a Workout Plan

- **Endpoint:** POST `/api/workout-plans/{plan_id}/exercises`
- **Description:** Adds a new exercise to an existing workout plan.
- **Body:**
  ```json
  {
    "name": "Exercise Name",
    "description": "Exercise Description",
    "category": "Exercise Category",
    "sets_target": 3,
    "reps_target": 12,
    "weight_target": 100
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 201 Created
  - Body:
    ```json
    {
      "workout_exercise_id": "unique-exercise-id",
      "message": "Exercise added to workout plan successfully."
    }
    ```

#### View Exercises Within a Workout Plan

- **Endpoint:** GET `/api/workout-plans/{plan_id}/exercises`
- **Description:** Retrieves all exercises associated with a specific workout plan.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    [
      {
        "exercise_id": "unique-exercise-id",
        "name": "Exercise Name",
        "description": "Exercise Description",
        "category": "Exercise Category",
        "sets_target": 3,
        "reps_target": 12,
        "weight_target": 100
        // Additional exercise details.
      }
      // More exercises.
    ]
    ```

#### Update Exercise Details

- **Endpoint:** PUT `/api/workout-exercises/{workout_exercise_id}`
- **Description:** Updates details of an exercise within a workout plan.
- **Body:**
  ```json
  {
    "name": "Updated Name",
    "description": "Updated Description",
    "category": "Updated Category",
    "sets_target": 4,
    "reps_target": 10,
    "weight_target": 105
    // Additional fields to update.
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Exercise updated successfully."
    }
    ```

#### Remove Exercise from a Workout Plan

- **Endpoint:** DELETE `/api/workout-exercises/{workout_exercise_id}`
- **Description:** Removes an exercise from a workout plan.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Exercise removed from workout plan successfully."
    }
    ```

### Nutritional Targets Management

#### Set Nutritional Targets

- **Endpoint:** POST `/api/users/{user_id}/nutrition-targets`
- **Description:** Sets initial nutritional targets for the user.
- **Body:**
  ```json
  {
    "caloric_intake": 2500,
    "protein_target": 150,
    "carbs_target": 300,
    "fats_target": 70
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 201 Created
  - Body:
    ```json
    {
      "nutrition_id": "unique-nutrition-id",
      "message": "Nutritional targets set successfully."
    }
    ```

#### View Nutritional Targets

- **Endpoint:** GET `/api/users/{user_id}/nutrition-targets`
- **Description:** Retrieves the current nutritional targets for the user.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "caloric_intake": 2500,
      "protein_target": 150,
      "carbs_target": 300,
      "fats_target": 70
      // Additional details.
    }
    ```

#### Update Nutritional Targets

- **Endpoint:** PUT `/api/nutrition-profiles/{nutrition_id}`
- **Description:** Updates the nutritional targets for the user.
- **Body:**
  ```json
  {
    "caloric_intake": 2600,
    "protein_target": 160,
    "carbs_target": 310,
    "fats_target": 75
    // Fields to update.
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Nutritional targets updated successfully."
    }
    ```

#### Reset Nutritional Targets

- **Endpoint:** DELETE `/api/nutrition-profiles/{nutrition_id}`
- **Description:** Resets the nutritional targets for the user.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Nutritional targets reset successfully."
    }
    ```

### Workout Progress and Analytics Management

#### Read Progress and Analytics

- **Endpoint:** GET `/api/workouts/analytics/{user_id}`
- **Description:** Retrieves progress charts and analytics based on a user's workout history and nutritional adherence. Includes estimates of 1 rep maxes and comparisons with actual 1 rep maxes, alongside completed session data from previous workouts.
- **Parameters:** `user_id` (path): UUID of the user to retrieve analytics for.
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - **Body:**
    ```json
    {
      "progressCharts": {
        "strengthIncreaseOverTime": {
          "benchPress": {
            "estimated1RM": [
              /* Array of {date, value} pairs */
            ],
            "actual1RM": [
              /* Array of {date, value} pairs */
            ]
          },
          "squat": {
            "estimated1RM": [
              /* Array of {date, value} pairs */
            ],
            "actual1RM": [
              /* Array of {date, value} pairs */
            ]
          }
          // Additional exercises as needed
        },
        "nutritionalAdherence": {
          "calorieIntake": [
            /* Array of {date, value} pairs */
          ],
          "proteinIntake": [
            /* Array of {date, value} pairs */
          ]
          // Additional nutritional metrics as needed
        }
      },
      "completedSessions": [
        {
          "date": "YYYY-MM-DD",
          "workoutId": "uuid",
          "exercises": [
            {
              "exerciseName": "Bench Press",
              "sets": [
                { "reps": 10, "weight": 135 },
                { "reps": 8, "weight": 185 }
                // Additional sets as needed
              ]
            }
            // Additional exercises as needed
          ]
        }
        // Additional sessions as needed
      ]
    }
    ```
- **Error Responses:**
  - 404 Not Found: User or data does not exist.

#### Update Workout Details

- **Endpoint:** PATCH `/api/workouts/details/{workout_exercise_id}`
- **Description:** Updates the details of a specific exercise within a workout, including reps, sets, and weights used.
- **Parameters:** `workout_exercise_id` (path): UUID of the workout exercise to update.
- **Body:**
  ```json
  {
    "sets_completed": "int", // Number of sets completed.
    "reps_completed": "int", // Number of reps completed per set.
    "weight_used": "decimal" // Weight used for the exercise.
  }
  ```
- **Require Authentication:** Yes
- **Success Response:** 200 OK
  - Body:
    ```json
    {
      "message": "Exercise details updated successfully."
    }
    ```
- **Error Responses:**
  - 400 Bad Request: Invalid request format.
  - 404 Not Found: Workout exercise does not exist.

#### Delete Workout Session

- **Endpoint:** DELETE `/api/workouts/sessions/{workout_id}`
- **Description:** Deletes a specific workout session, including all related exercises and their details.
- **Parameters:** `workout_id` (path): UUID of the workout session to delete.
- **Require Authentication:** Yes
- **Success Response:** 204 No Content
  - Body:
    ```json
    {
      "message": "Successfully deleted the workout session."
    }
    ```
- **Error Responses:**
  - 404 Not Found: Workout session does not exist.
