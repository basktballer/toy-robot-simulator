# toy-robot-simulator

## Instructions
To run the app, you'll need to run the servers for both front end and backend apps. Frontend runs on localhost:3000 and Backend runs on localhost:4000. See links below for detailed instructions. 

([Link to Frontend app instructions](./frontend/toy-robot-simulator/README.md))

([Link to Backend app instructions](./backend/toy-robot-simulator-backend/README.md))

## Initial Design Thoughts
### Tech Selection
- NextJS
  - Selected due to ease of scaffolding, minimize amount of additional config and time spent there
  - Do we need RXJS to handle events
- NestJS
  - Use rest, simple enough application, don't need flexibility of GraphQL (select fields)

### Database Schema
#### Requirements:
- Need to have robot moves history
  - How do we store it? 
    - JSON?
    - In the table?
      - One move per row?
- Wipe out if a new robot is placed on the grid
  - Notion of multiple robots? 
#### Schemas
- Robot Table Schema
  - id
  - x
  - y
  - facing
  - timestamp
- Moves Table Schema
  - id
  - robot_id
  - move_number (increments as we go)
  - facing
  - X
  - Y
  - timestamp ?

### Simple flow diagram
User Actions
- PLACE
  - Inputs (X = 0,Y = 0)
- LEFT
- RIGHT
  - Somehow enumerate the options for rotation based on current facing and direction
- MOVE
  - Move by 1 space in facing direction, if not at edge
- REPORT
  - eg. Output 2,4,EAST


### Steps Taken
- Finish scaffolding frontend and backend apps
- Setup controller to send data when requested
- Connect apps together and see initial dummy data flowing through
- Set up database and RobotsService, define DTOs
- Implement queries and database logic 
  - Slower due to syntax and novelty with Sequelize
  - Simplified architecture to pass in robot id to API
- Implement Material UI for quicker styling
  - Needed to include NextJS integration steps for Material UI (AppRouterCacheProvider)
- Hook up buttons to API calls, log out robot new positions
- Create table component with grid data structure
- Create an function that populates / updates the grid
- Connect state updates to UI and keyboard events

### Assumptions: 
- Robot should default to rotate right if opposite direction selected for rotation (only possible with keyboard)
- API should take in current robot id from the app, instead of knowing to move the latest. Improves query latency

### Future Improvements
- Use OOO / Class based architecture to improve SwaggerDocs
- Clean up API Helpers on Frontend into a Service that creates classes from data received, validate data arriving
- Split backend logic out of RobotController into Manager module
- Add E2E tests
- More extensive database error handling
  - PlaceRobot if API called with values exceeding the table dimensions
  - Misc Read/Write/Update errors
- Nice to haves?
  - Store robot id in a cookie? Fetch latest
  - Local App State + Batched writes to DB from the app
  - Support dynamic table resizing