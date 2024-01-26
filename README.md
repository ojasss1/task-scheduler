link - https://task-scheduler-kt4g.onrender.com

Tech stack :-
frontend - react 
backend - nodej, expressjs
database- mongodb
authentication (login and signup) - firebase

This react app consists of following features :-
--> creating an account and logging in.
--> creating tasks and also adding some additional description to each tast.
--> dropping a task after completing it.

data is structured in mongodb in the following way :-
the master database name is test ->
inside this database there are collections where each collection name corresponds to that specific user's uid which is created when user creates an account and registers using firebase ->
inside each collection there are docs where each doc is a task and has following key-value pairs :-
task_heading, description.
In some time i will add feature to add sticky notes for a task and also see the time when the task was created.

Thank you for trying out this app
