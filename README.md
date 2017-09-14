# codegenerator
Generates boilerplate codes for node and angular projects

## To work or contribute in the project

#### 1. Clone this repo in your server.

```sh
git clone https://github.com/cmtanko/codegenerator.git
```

#### 3. Run

```sh
node bin/coddy.js
```
### How to use
```sh
> npm install -g codegenerator

> node bin/coddy.js

Enter the name of component(type help for help)
> help
To generate files: generate <stack(node/angular)> <filename>For eg. entering "generate student" will generate student.controller.js,student.service.js, student.service.spec.js
To exit: exit

> nodegen
 Node project created successfully!Follow the following steps next.. 
 cd my-app
 sudo npm install 
 npm run dev 

> generate node student 
student.controller.js created successfully !
student.service.js created successfully !
student.sevice.spec.js created successfully !

> generate angular student
student.controller.js created successfully !
student.service.js created successfully !
student.sevice.spec.js created successfully !

> exit
```
### Contribution

Feel free to fork this project. Do send a pull request our way if you implement
something the world should see.

