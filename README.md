# QuizMe

QuizMe is a flashcard webapp that makes studying for tests easier and more fun!

-> Available at [quizme.naspoapps.com](https://quizme.naspoapps.com/)

It first started as a university project of mine which I took a step further and decided
to make it an actual deployed side-project of mine.

## Features

- Create flashcards.
- Create topics to categorize flashcards.
- Quiz yourself on the flashcards you made.
- Quizzes can be timed or not.

## Deployment

### Frontend

_Steps from `/client`_

1. Build the project: `npm run build`
2. Deploy the static files on a web server.

### Backend

_Steps from `/server`_

<u>Step 1: Build the docker image</u>\
`docker build -t naspo/quizme-server:<tag> .`\
_The tag should be the version number of the application._

<u>Step 2: Push the image</u>\
Push the docker image to the docker hub.\
`docker push naspo/quizme-server:<tag>`

<u>Step 3: Pull the image</u>\
Pull the image on the server.\
`docker image pull naspo/quizme-server:<tag>`

<u>Step 4: Create .env file</u>\
Create a `.env` file containing the following properties:

```
PROD_DB_HOST=
PROD_DB_PORT=
PROD_DB_USER=
PROD_DB_PASSWORD=
PROD_DB_NAME=
NODE_ENV=production
```

This `.env` file will be passed to the docker container when we run the image.\
(The .env file must be kept private and should not be committed to version control).

<u>Step 5: Run the image in a container</u>\
`docker run -d -p 3000:3000 --name quizme-server --env-file path/to/.env --restart unless-stopped --add-host=host.docker.internal:host-gateway naspo/quizme-server:<tag>`

_Note for the above command: QuizMe's database is deployed on the same server, so `host.docker.internal` is used to access the host machine. However this doesn't implicitly work on Linux so a mapping is created, hence the `--add-host` flag._
