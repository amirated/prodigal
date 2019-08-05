# ![Portfolio](https://uiportfolioimages.s3.ap-south-1.amazonaws.com/r.png)


> ### Portfolio ReactJS application made for the purpose of showcasing the works done in the fields of art, music and science.

## Setup

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`
 
Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

### Making requests to the backend API

The backend APIs are written in Ruby on Rails and the repository can be found here.

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)


## Overview

**Upcoming projects:**
- GAN
    - creation of image datasets
    - training the model
    - results and improvements
- Immersive Audio Visualisation
    - FFT of audio files
    - visualisation

<br />

[Also check](https://sptfy.com/germination)(https://instagram.com/_amitesh_)
