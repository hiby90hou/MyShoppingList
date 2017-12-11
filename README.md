# MyShoppingList - an React-native based apk project
## Making cool App with React Native and have fun!
### this app can help me to remember food expire date and reduce food waste

## 1. Who I am?
   1. GA WDI student, PM background
   2. Rookie programmer- I know Javascript, HTML, CSS, and very little ruby
   3. I want to create an app
## 2. The challenge I faced
   1. No java or android background
   2. really new to react
   3. I am learning backend technology
   
## 3. Why I choose react-native and the similarity between css and react-native stylesheet
   1. stylesheet just like CSS
   
   2. react is good to create list and react-native is very similar to react

## 4. Just do it
   ### 1. my plan
      1.1 core function of the shopping list
      1.2 user system with database
      1.3 add barcode scan function
      1.4 add recommend expire date to the common foods
      1.5 add menu recommend function
      
      ...(on going)
      
   ### 2. Implement
      2.1 Start with the core function of my app - a list
          a. I need to make a list
          b. I can add new shopping item to the list
          c. I can delete item from this list
          
      2.2 improve the core function
          a. I can record food expire date of each item in this list
          b. I can change food expire date if I got it wrong
          c. If the current date is close to the expire date，warn the user
          d. If the food expired, warn the user
          
      2.3 the app can restore the list, when I open it, I can see the list which I created last time
          a. Store the data online? No, local first!
          b. Read the stored data file from my phone and show it in the app
          (react-native-fs)
          
      2.4 create user account with user name and password
          a. Each user name can have one account with data file and password
          b. need a function to create new account
          c. Can switch to different account by login and logout
          
      2.5 add auto login function to the app
          a. in the login page, there is a switch, when the switch is on, when the next time I login in, it can automatic login
          b. I need a new variable to store my auto-login value.
          c. I need to store this variable in my data file
          
      2.6 add scan bar code function
          a. Camera setting
          b. bar-code API
          (react-native camera)
      2.7 Create a ruby backend server
          working on it...
## 5.Issues
    ###1. The password of ruby server is not working
    ###2. Need a recommend food list
