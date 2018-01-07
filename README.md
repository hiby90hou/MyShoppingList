# ![alt text](https://github.com/hiby90hou/MyShoppingList/blob/master/graphic%20design/logo_v1/mipmap-hdpi/ic_launcher.png "MyShoppingList Logo") MyShoppingList 
## An React-native and rails based apk project
MyShoppingList is an android app project which can help people to reduce food waste and help them to save money on food shopping. 

The user base of this app should be the client of supermarket.

When users start to use this app, they can input their shopping goods to the app and make a shopping list. 

After that, when they started to shopping in the supermarket, they can tick the box which before the goods name to makesure they purchased this item. In this session, the app can let them to record the food expire date. 

If they find out they have to buy some extra goods, they can easily recorded them in the app by scan their barcode (I do not have the money to buy api, so this function currently is not working).

When the item in the shopping list is closing to the expire date(less than 3 days), the font color will change to red; When it expired, the font color will change to black and cross out, so the user can get warning about their food situation by review their shopping list this app.

The user can use their username and password to login, after they sign up in one device. they can use their username and password to login with or without the internet. If they cannot access to internet when they tried to add new records to this app, when they can access to the internet and this app had been opened, they can be directly updated to the server.

## 1. Getting Started for user
This apk can only be installed on android. You can download the apk file by [this link](https://github.com/hiby90hou/MyShoppingList/blob/master/apk_file_release/myshoppinglist1.0.apk) and install it in your smart phone. 

## 2. Getting Started for developer

### Prerequisites
1. git
2. npm 5.5.1
3. node v8.9.1
4. react-native-cli: 2.0.1
5. android studio
6. rvm
7. bundle 1.13.6
8. ruby 2.2.6p396
9. Rails 5.0.6
10. XAMPP

### Installing
1. Clone react-native project font end side from git by 
```
$ git clone https://github.com/hiby90hou/MyShoppingList.git
```
2. Install dependent packages
```
$ npm install
```
3. Clone react-native project font end side from git by 
```
$ git clone https://github.com/hiby90hou/aws-rails-server.git
```
4. Install dependent packages
```
$ bundle install
```
5. Go to rails server folder and run rails server
```
rails s
```
6. Go to font end side git folder and run android studio

## 3. Authors
* **CHANG LIU** - *Initial work* - [hiby90hou](https://github.com/hiby90hou)
I am a GA WDI student with design, project management and engineer background. 
Now, I am looking for job! I will be very appreciate if someone can provide me an opportunity.
If you are interesting on me or my project, please contact me by email: 
   1. GA WDI student, PM background
   2. Rookie programmer- I know Javascript, HTML, CSS, and very little ruby
   3. I want to create an app

## 4. Working LOG
1. my plan
      1.1 core function of the shopping list
      1.2 user system with database
      1.3 add barcode scan function
      1.4 add recommend expire date to the common foods
      1.5 add menu recommend function
      
      ...(on going)
      
2. Implement
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
          Just complete a simple version of ruby server.
          Working on the function of change let user to change their password.

## 5.Issues
    ###1. The password of ruby server is not working
    ###2. Need a recommend food list
## License
This project is licensed under the MIT License