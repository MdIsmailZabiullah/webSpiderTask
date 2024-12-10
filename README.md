for set up **********

npm init
npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemon

configured in pakage.json file*********
{
"type": "module",
"scripts": {
    "start": "nodemon index.js"
  },
}
for loading all dependency******
nmp install
to run the application*******
npm start

APIs
=======
to add a new task***********
http://localhost:5000/test/Task

to get all task**********
http://localhost:5000/test/All

to get a partocular task*********
http://localhost:5000/test/get/Task/:task_id

to delete a  task*********
http://localhost:5000/test/delete/Task/:task_id

to update a  task*********
http://localhost:5000/test/update/Task/:task_id

for User signup**********
http://localhost:5000/user/signup (examlple data= {"name":"Ismail", "email":"ismail200@gmail.com" ,"pass1":"ismail123"})

for User login**********
http://localhost:5000/user/login (examlple data= {"email":"ismail200@gmail.com" ,"pass1":"ismail123"})

Note: middleware function added to get all tasks API
