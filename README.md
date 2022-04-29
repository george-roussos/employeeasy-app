# Employeeasy

Employeeasy is a new web-app which streamlines managing of your employees, using a minimal UI that focuses on functionality and ease of use. Built with individual managers in mind, this app is a tool that lets you:

- Add your team to it
- View all your employees in one place
- Manage employees' vacation
- Manage team expenses and link them to the corresponding employee

Using the built-in dashboard, take a glance at your weekly overview, including your daily meetings and your average statistics.

## Demo
A demo version of the application, which you can try out, is deployed [here](employeeasy.netlify.com). You can login using the following credentials:

- username: *malinholmgren*
- password: *12345*

You are also free to create your own personal account. After signing up, use the same credentials to log into the environment. In that case, note that: 
* you should probably not use personal information when signing up, for security reasons
* you will only be able to see employees in the database which are linked under other existing accounts

## Live Walkthrough

![live walkthrough](./src/images/employeeasy-screens/Walkthrough.gif)

## Local Run

Clone this repo and run `npm i`. The frontend will work, but for security reasons I have not included the credentials to connect to the MongoDB instance, so you will have to contact me and I will gladly work it out for you.

## Tech Stack

Employeeasy is written on React (using Redux for state management), JS, HTML5 and CSS3.

## Screenshots

Below are some screenshots so you can get an idea of what the app looks like.

### Login Page

## ![login page](./src/images/employeeasy-screens/LoginPage.png)

### Dashboard

## ![dashboard](./src/images/employeeasy-screens/DashboardPage.png)

### All Employees

## ![employees](./src/images/employeeasy-screens/EmployeeView.png)

### Adding a new employee

## ![new employee](./src/images/employeeasy-screens/NewEmployee.png)

### Vacation

## ![vacation](./src/images/employeeasy-screens/VacationView.png)

### Help Center

## ![help center](./src/images/employeeasy-screens/HelpCenter.png)
