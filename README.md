# LeetClone - Real Time Code Editor

LeetClone is a real-time code editor project built using Next.js. It aims to provide a coding platform similar to LeetCode, incorporating essential features for coding practice and problem-solving. LeetClone includes fetching problems from a Firebase database, user management with login/register functionality, and a code editor powered by the CodeMirror package. It leverages TypeScript for robust type checking, tailwind CSS for responsive UI design, Firebase for efficient database operations, and Recoil for state management. Additionally, LeetClone features a confetti animation upon successful code submissions.

## Table of Contents

 - [Features](#features)
 - [Technologies Used](#tech-stack-used)
 - [Setup and Installation](#setup-and-installation)
 - [Usage](#usageexamples)
 - [Demo](#demo)
 - [Screenshots](#screenshots)
 - [Contributing](#contributing)
 - [Contact](#feedback--contact)

## Features
- Fetching and displaying problems from the Firebase database.
- User registration and login functionality.
- Secure authentication using email and password.
- Real-time code editor with syntax highlighting and autocomplete.
- Code submission and verification against predefined conditions.
- Confetti animation upon successful code submission.

## Tech Stack Used
**Next.js, TypeScript, Tailwind CSS, Firebase, CodeMirror, Recoil**

## Setup and Installation

To run this project locally, you'll need to follow these steps:

1. Clone this repository using commend:
`https://github.com/SahilHalbe09/leetcode-clone`

2. Install dependencies by running `npm install` or `yarn install`

3. Create a new Firebase project and add your Firebase configuration to a .env.local file in the root directory. You can find your Firebase configuration in the Firebase console under "Settings" > "General" > "Your apps" > "Firebase SDK snippet".

4. Run `npm run dev` or `yarn dev` to start the development server.

5. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage/Examples
Note: To use some `write` features, you need to login/signup to the app.

- Logging In and Signing Up
    - Click the "Log In" or "Sign Up" button in the navigation bar.
    - Enter your email and password or click the "Continue with Google" button.
    - Click "Log In" or "Sign Up" to proceed.
- Fetching Problems
    - Once logged in, the problems will be fetched and displayed on the homepage.
    - Click on a specific problem to view its details and open the code editor.
- Code Editor
    - Write your code in the editor area.
    - Click the "Submit" button to submit your code for verification.
    - If the code passes the predefined conditions, a confetti animation will appear.

## Demo

Here is the video demo of the project:

https://www.youtube.com/watch?v=EG5cysZMED4

## Screenshots

### Home page 
![Home page](https://i.ibb.co/Pxpr0M3/image.png)

### Problem Page
![Problem Page](https://i.ibb.co/0t1S2Gy/image.png)

### Problem Success
![Problem Success](https://i.ibb.co/x86qqwr/image.png)

### Sign In Page
![Sign In Page](https://i.ibb.co/fFcjLHc/image.png)

## Contributing

Contributions are always welcome! If you have any ideas, suggestions, or bug fixes, please submit a pull request or open an issue on the GitHub repository.

## Feedback / Contact

If you have any feedback, please reach out to me at sahilhalbe.business@gmail.com or visit [my site](https://www.thesahildev.in/)
