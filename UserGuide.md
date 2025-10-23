User Guide — Resolved/Unresolved Topics Feature

Overview: 
This feature introduces ability for admin to clearly indicate which questions have been answered and which still require attention.

# User Guide: Mark Resolved and Mark Unresolved Feature

## Overview
The "Mark Resolved" and "Mark Unresolved" feature allows users to toggle the resolution state of a question. This feature updates the resolution state in the database to either `1` (resolved) or `0` (unresolved) based on the user's action.

---

## How to Use the Feature

1. **Access the Question**:
   - Navigate to the question you want to mark as resolved or unresolved and click on it.

2. **Mark as Resolved**:
   - Click the **"Mark Resolved"** button located in topic tools.
   - The question's  state will be updated to `1` in the database, indicating it is resolved.

3. **Mark as Unresolved**:
   - Click the **"Mark Unresolved"** button located in topic tools.
   - The question's  state will be updated to `0` in the database, indicating it is unresolved.

4. **Visual Feedback**:
   - After clicking either button, the UI will reflect the updated state (e.g., a visual indicator showing the current resolution status), that can be seen when you go back to the topic tools list of all the topics 




## User Testing

To ensure the feature works as intended:
1. **Test Case 1**: 
   - Click the "Mark Resolved" button for a question.
   - Verify that the database stores the resolution state as `1`.

2. **Test Case 2**:
   - Click the "Mark Unresolved" button for the same question.
   - Verify that the database stores the resolution state as `0`.

3. **Repeat**:
   - Perform the above steps for multiple questions to ensure consistency.
 


Technical Overview

### Database Schema
- A single boolean field `resolved` was added to the topic object
- `resolved = true` → topic is resolved
- `resolved = false` → topic is unresolved (default state) 

### Endpoints
- `POST /api/v3/topics/:tid/resolve` → Sets `resolved = true` 
- `POST /api/v3/topics/:tid/unresolve` → Sets `resolved = false` 
- `GET /api/v3/categories/:cid/topics` → Returns topics with a `resolved` property for each topic 

### Frontend Integration
- Updated templates to show “Mark Resolved” and “Mark Unresolved” buttons dynamically

### Backend Integration
- Modified topic controllers to handle resolve/unresolve actions and return updated topic states in the API response.  
- Added schema validation for the new resolved field in `TopicObject.yaml` 

## Automated Tests

### Test Location
The automated tests for this feature can be found at: tests/topics/events.js

command: run npm test 
