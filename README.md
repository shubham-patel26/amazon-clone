## About the App

**Link to the deployed app :** [Amazon-clone](https://clone-5726e.firebaseapp.com/)

* #### Amazon-clone is a MERN stack, Firebase, Stripe build web application with functionalities of Amazon.

* ### Features and functionalities supported by this app are
    * __Supports Authentication of users using Firebase Authentication__
    * __Shows the details of the products__
    * __Add to basket functionality__
    * __Remoave from basket functionality__
    * __Full payment process using Stripe API__
    * __Order details of every user stored in firebase store__

* ### Technology Used
    * **Frontend : Reactjs, jsx, css. Material-UI, React Context API**
    * **Backend  : Express.js, Firebase Auth, Firebase Functions, Firebase Store, Stripe API.**



## How to run on your local machine

> **Run the following command in the terminal of the directory in which you want to clone the app**

```bash
    git clone https://github.com/shubham-patel26/amazon-clone.git
```
> #### then run the following command to install the dependencies of the project
```bash
    npm install
```
> #### install Firebase CLI globally by running the command
```bash
    sudo npm install -g firebase-tools
```
> #### make an account of firebase and create a project *Amazon-clone*
> #### replace the firebaseConfig within Amazon-clone/src/firebase.js with the app config of your newly created amazon-clone project on firebase
> #### then go to the /functions folder and run the command
```bash
    npm install
    
    # Login to your firebase account
    firebase login
    
    # this will start the backend
    firebase emulators:start 
```

> #### now go to the project directory and run below command to start the app
```bash
    npm start
```
