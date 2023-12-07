# Guess Who Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Section 1: Downloading and compiling source code
1) Download source code from GitHub (https://github.com/HoldenSch/guess-who/tree/main) onto Visual Studio Code (or some other source-code editor) using Git (`git clone https://github.com/HoldenSch/guess-who.git`). If you don't have git, please follow directions to install it here: https://git-scm.com/downloads
2) In terminal window, if not already in the guess-who directory, cd into the guess-who directory (`cd guess-who`)
3) Check if you have Node.js/npm downloaded by checking the version (`node -v` and `npm -v`). If there’s a version output, then Node.js/npm is downloaded properly. If an error occurs, that means you haven't installed it, so download Node.js/npm by following instructions at https://nodejs.org/en/download/. You may need to restart VSCode for it to fully install.
4) With Node.js/npm downloaded, run npm install (`npm install`) in the guess-who directory. This will install all packages needed for this directory.
5) From the guess-who directory, cd into the backend folder (`cd backend`)
6) Run npm install again (`npm install`), which will install all packages for the backend directory.
7) Cd back to the guess-who folder (`cd ..`) and run npm (`npm start`), which will run app in development mode. You should receive a “webpack compiled successfully” message in the terminal window and http://localhost:3000/ should automatically pop up on your web browser. If it doesn't automatically pop up, simply open [http://localhost:3000](http://localhost:3000) in your browser to view. Sometimes, http://localhost:3000/home would automatically pop up on your web browser instead of the main page. If that's the case, then simply navigate to http://localhost:3000/.
8) Click the "+" to add a new terminal window. Then cd into the backend folder (`cd backend`) and run npm (`npm start`). This will let the server listen through port 8081. To make sure it’s listening, check the terminal, which should say in green:
“[nodemon] starting `node server.js`
listening”
9) Go to http://localhost:3000/ and start playing! (See Section 3 for instructions on how to play the game)

## Section 2: MySQL Database

We have a MySQL database on MySQL Workbench that handles SQL requests. This program is not needed to compile and/or test the program, since we have synced it with Google Cloud SQL, so we have omitted its installation steps from documentation. However, here is the schema listed below with 3 tables, if anyone wants to see:
1) Users → CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password_hash` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3

2) Names → CREATE TABLE `names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` text NOT NULL,
  `image` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb3

3) Game_codes → CREATE TABLE `game_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `code_name` varchar(6) NOT NULL,
  `names` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb3

## Section 3: How to play the game

This is a web game intended for laptops and computers (not intended for mobile devices). 

First, you can register for an account by clicking on the “Create Account” button (please don’t use an actual password). Then, you will be redirected to the login page where you use the same username and password to log in. Note, at the first time you click the register/login button, if nothing loads, please click the button again. Sometimes the server is slow and SQL doesn’t process when you click the button.

Then, once logged in, you can create a game by clicking the “Create Private Room” button. Enter the names of your characters in the box and upload photos from your computer (if you want). Note, please be patient when uploading photos because if photo sizes are large (a couple MB or larger), then the server will take around 0.5-1 seconds to compress the image; as a result, we disabled the “Add Character” button until the image is compressed. Furthermore, please don’t add any images larger than 10 MB (see more in Design.md). Once you are done adding names/images, drag all names that you want to use for your game over to the “Include” section. Once down, click “Play”. Note, if you added a lot of photos with large image sizes, the game board might take a few seconds to load. If it takes too long, please reload the page and remove some images.

Once in the game board, share the game code that pops up with your friends! If your friend has installed this game on another computer, they can log in and join the same game by inputting the code into the “Enter game code” on the homepage. Once your friend and you are in the game, you can play the game by asking your opponent “yes-or-no” questions about their secret character, and then narrow down your list by clicking on the cards to flip them over. Have fun!

If you want some demo boards, here are the username/password of some examples:

Username: Sunny | Password: Liu -> Demo board with Pokemon

Username: animal | Password: animal -> Demo board with animals

## Section 4: Video Demo
https://youtu.be/KMx_znlUkG8
This is our video link.
