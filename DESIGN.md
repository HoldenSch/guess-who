# Guess Who Design Implementation

Our project was mainly built using JavaScript files that we will elaborate in greater detail below. 

## 1) App.js
App.js is our central app that connects all the JavaScript component files and their relative URL paths.

## 2) Register.js and RegisterValidation.js
In Register.js, it will allow users to type in their registration information. After the user submits the form, the program will first call RegisterValidation.js to check any errors in the user’s input. More specifically, RegisterValidation.js makes sure that all 3 entries (username, password, and retyped password) are filled in. It also makes sure that password and retyped password are the same. 

Then, back in Register.js, Axios would send a message to server.js, which will first check that the username is unique (not taken) by searching through the ‘users’ table to make sure that no other entry has the same username. If the username is taken, the program will alert the user to retype another username. If the username isn’t taken, server.js will then hash the password using bcrypt salt and hash. We did this to make storing their passwords more secure. 

Then, the program would insert the user’s information (username, password) into the ‘users’ table using MySQL. We decided to auto increment the user_id column (primary key) so each user has a unique id; then in the future, we would then use it as the session ID to keep track of who is currently logged in (see (2)). If an error occurs when inserting the row into the table, we would alert the user; otherwise, the program will direct the user to the login page.

## 3) Login.js and LoginValidation.js
In Login.js, it will allow users to type in their login information. After the user submits the form, the program will first call LoginValidation.js to check any errors in the user’s input. More specifically, LoginValidation.js will make sure that all 2 entries (username and password) are filled in. 

Then, back in Login.js, Axios would send a message to server.js, which will first search for the username in the ‘users’ table. If a username is found and the hashed password is valid when compared to the inputted password (using bcrypt compare passwords function), then the user will be directed to the home page and the program will keep track on the user_id as the session ID. We did this because querying ‘names’ and ‘game_codes’ tables down the line would be easier; otherwise, if the username/password was invalid, the program will prompt the user to retype their login information. 

## 4) Play.js
In Play.js, the program allows users to either create a new game by clicking the “Create Private Room” button or they can join a game by inputting a game code in the “Enter game code” input form. 

If they click the “Create Private Room”, they would be redirected to the play page where they can create their own game (see (4)). 

Otherwise, if they input a game code in the input form, Axios would send a message to check if the game code is in the ‘game_codes’ table. If the code is a valid game code, then the program will retrieve the IDs of the names in an array format and then query through the ‘names’ table and store their name/image in an array of dictionaries. We decided to do it this way because this optimizes our data storage and reduces any redundancy in our database. Then, the program will set those global variables and direct the user to the board game. If the code is not valid, then the program will alert the user to retype the game code. 

Finally, the user can log out by clicking on the “Settings” drop down and then clicking “Log Out”. This would erase the session ID and direct the user to the login page.

## 5) Room.js and DragList.js
In Room.js, we mainly reference DragList.js from the ReactComponents folder because that program contains the variables that handle the “dragging” functionality of our program. 

In DragList.js, the program allows users to input their characters' names and upload their characters' images (if they want) from their computer. After clicking “Add Character”, it adds their character to the “Exclude” side of the board. Some further notes: we arbitrarily decided to set the image size to have a max limit of 10 MB because we don’t want to overwhelm the servers. Additionally, we had an issue where some uploaded images (2 MB or larger) take too long to query and process, especially when loading up the game board (see (5)). Therefore, we made the conscious design decision to automatically compress all images down to 30 KB when they are uploaded. We tested this on sample images and decided that 30 KB was a good size, as it still kept the quality of the image on the cards while also speeding up the processing and loading time. Furthermore, as stated in the ReadMe.md, compressing large images takes around 0.5-1 seconds to complete, so we also decided to disable the “Add Character” button until the image is finished compressing, so it can be properly processed. 

Once “Add Character” is clicked, Axios sends a message to server.js, which will insert the character’s information into the ‘names’ table. If there was an issue with uploading, compressing, and/or inserting the character, the user will be alerted and prompted to insert another character. 

Additionally, users can click the “X” button on each character to delete the character; Axios would send a message to server.js, which will then delete that character from the table using its unique ID. 

Another important feature of our game is that every character the user inserts is saved for the next time they log in. In other words, if the current user logs out and then logs back in at another time, any and all characters they’ve previously made will still be on the board. In order to do this, Axios sends a message to server.js as soon as the window is loaded to retrieve all characters that correspond to that user’s ID from the database. We decided to include this feature because it makes the user’s life more convenient and saves them the frustration of reinserting all their characters. 

For our “dragging” functionality from “Exclude” to “Include” column, we added this because we knew that users likely don’t want to use every character for every game. Therefore, we let them “drag” the characters they want to use for the current game into the second column. This is to save the user’s time and energy, so they don’t have to keep adding/deleting characters.

Finally, once the user is done dragging all the characters they want to use onto the “Include” column, they can click “Play”. Once clicked, the program will generate a random 6-character code using lowercase letters, uppercase letters, and numbers. We decided to go with a randomly generated code because it mimics real-life games and the chances of generating the same 6-character code is very close to 0%. Additionally, the program will also use a random number generator to select your secret character that your opponent is trying to guess. Once these are all generated, the program will direct you to the game board.

## 6) Board.js and FlipCard.js
In Board.js, this program will set up the entire game board for the user. First, there will be a popup that will tell the user the game code and their secret character. Then, the user can share the game code to their friends, who can join the same game on another computer! After clicking "Confirm", the popup would disappear and then the entire board will show. 

Then, assuming that your opponent (Player 2) is on another computer, you (Player 1) will start asking Player 2 yes-or-no questions about their secret character. Then, you can narrow down your options by clicking on the cards to flip them, which will cause a big red “X” mark to appear. If you accidentally clicked on a card, don’t worry because you can click on the card again to turn it back over. Whoever guesses the opponent’s secret character first wins! 

If the players forget the join code or their secret character, we decided to add a “Game Info” button in the “Settings” dropdown, so they see the same popup information again. 

When the players are done playing the game, they can click “Settings” and either click “Home” (directs to home page) or “Logout” (clears their session ID and directs to login page)

## 7) Various CSS files
We will not elaborate in much detail about our CSS files, as they just contain properties that enhance the looks and aesthetics of our web app. We did use Bootstrap for much of our CSS.