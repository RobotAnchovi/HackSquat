# Test file for JSON

This is a test file for JSON.

### LOGIN

```json
{
  "email": "demo@aa.io",
  "password": "password"
}
```

## WORKOUTS

### POST /api/workouts/ - Create a New Workout

```json
{
  "workout_plan_id": 1,
  "date": "2024-02-28",
  "duration": 60,
  "intensity": 5,
  "location": "Gym",
  "status": "Planned",
  "notes": "Focusing on cardio today"
}
```

### PUT /api/workouts/<int:workout_id> - Update Workout

```json
{
  "workout_plan_id": 1,
  "date": "2024-02-28",
  "duration": 60,
  "intensity": 5,
  "location": "Gym",
  "status": "Completed",
  "notes": "Focusing on cardio today"
}
```

## WORKOUT EXERCISES

### POST /api/workout_exercises/ - Add Exercise to Workout

```json
{
  "workout_id": 1,
  "exercise_id": 1,
  "sets_target": 3,
  "reps_target": 12,
  "weight_target": 150.5,
  "is_cardio": false
}
```

```json
{
  "workout_id": 1,
  "duration_minutes": 30,
  "distance_km": 5,
  "duration_minutes": 30,
  "distance_km": 5,
  "is_cardio": true
}
```
