# Prolego

## Introduction

  Prolego is a Robust web application for predicting student academic performance, it offers to contribute to the reduction of academic dropout and failure in educational institutes by predicting student's academic performance including drop off rate, academic success, to identify students at risk at an early stage of their academic path, so that strategies to support them can be put into place, in order to help Educators not only to focus more on bright students but also to initially identify students with low academic achievement and find ways to support them.

## API Documentation

  The documentation for the API can be found here [Prolego](https://documenter.getpostman.com/view/11215567/UzBmM7GL#0ed2871f-3d6c-47c4-8a9f-2fba0e10a374)

## Features

  Based on API Endpoints requirement, the features covered for the endpoints are:

### Admin User

  * Get all user [token required]
  * Get user     [token required]
  * Change Password [token required]
  * update user [token required]

### Authentication

  * Sign up 
  * Sign in 
  * Sign in with google account
  * Forgot Password
  * Reset Password

### Dasboard

  * upload file [token required]
  * Get all students [token required]
  * Get student  [token required]
  * Get student category [token required] (dropouts, gradutes)
  * predict all students [token required]
  * predict a single student [token required]
  * prediction summary [token required]
  * Attendance [token required]
  * top5 five student [token required]
  * top five students in various courses [token required]
  * Search students by name or mat number [token required]

 ## Dependencies

  To install Prolego API, you will need the following:

  * Node
  * PostgreSQL
  * db-migrate
  * Other dependencies required are listed in the package.json file. Use `npm install` on the command line
  * Environment variables are defined in a .env file. You can find a .example.env file in the config folder to guide you on setting up your .env file.


## Installation

    The steps outline will provide a walkthrough on how to install the app on your local machine

  * Clone this repository
  * From the terminal, change directory to prolego folder
  * Ensure that you are on the main branch. If on any other branch, run git checkout main on the terminal.
  * Run `npm install` from your terminal in your project directory to install all dependencies
  * Then run the app with the command `npm run dev`

## Usage

    To test out the endpoints, follow the following steps

  * Once all dependencies have beeen installed, in the terminal type `npm run dev` on your terminal to test the endpoints  using postman or any other platform of your choice. you can find the app hosted link" [here](https://prolegoapp.herokuapp.com).

## Limitations
  * Currently, students can't access the platform.
  * Real-time in-app notification was not handled.

How to contribute

  Contributions are welcome and appreciated

  * Fork this repository
  * Open a terminal and execute the following command to make a local copy $ `git clone https://github.com/salimkarbm/Prolego`
  * Run `cd Prolego` to navigate into the folder
  * Make your contributions to your local repo
  * Add a connection to the original repo using $ git remote add repo name `https://github.com/salimkarbm/Prolego`. 
  Note: repo name is a name you choose
  * Run git $ `remote -v` to verify that the connection is established
  * Make your contributions to your local copy of the project
  * Run $ `git add filename`, `git commit -m "commit message"` to add and commit your contributions
  * Run $ `git push origin proposed-feature-name` to push your changes to your copy of the repository
  * If you feel you've made a contribution that will improve the project, raise a Pull Request against main branch.
  Be descriptive enough about your contributions so other contributors will understand what you've done

  Pull Requests should:

  * Contain code written in ES6 for Javascript files.
  * Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
  * Ensure test cases are written for the feature being developed

## License

   This project is available for use and modification under the ISC License. See the LICENSE file for more details.

## Contributor

  Salim Imuzai
  Emmanuel Onugha

# Show your support

- Give a :star: if you like this project
