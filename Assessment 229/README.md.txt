Todo Application

Assumptions

TodoCreator
1) Generating ID 
- A unique ID is simply generated by access to a local variable counter which 
increments by 1 every time a new todo is created successfuly.

2) Verifying title 
- A simple checks to see if title is valid. Title length has to be 3 characters or more

3) Verifying month
- A Simple check to see if month is valid. It either has to fall within '1'-'12' or be ''

4) Verifying year
- A simple check to see if year is valid. It either has to have 4 characters or be ''

TodoList 
1) Has a private function which returns a reference to the selected object. This 
function can only be accessed by methods in the TodoList to prevent direct manipulation
of the todos

2) Has an additional method getAllIds which simply returns all the IDs of the todos 
in an array.

TodoManager
1) Has 2 private functions validTodos and completed which aids in functional abstraction.
  
 