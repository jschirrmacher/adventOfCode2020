# Solution of [Advent of Code 2020](https://adventofcode.com/)

I collect the solutions of the "Advent of Code" puzzels in this repository. See the `/puzzles` folder for these solutions.

For an easier preview of the results, I've included an express.js server, and even a Dockerfile

## Prerequisites

You need to have git and node 14 installed on your machine.
Then, you can clone the repository:

    git clone https://github.com/jschirrmacher/adventOfCode2020.git
    cd adventOfCode2020

## Running with the express.js server

Install dependencies and run the server:

    npm install
    npm start

Then, open a browser at http://localhost:3000

To stop the server, press Ctrl-C in the terminal window you've started the server.

## Running with docker

If you have Docker installed, you can easily run

    npm run build
    npm run in-docker

Then, open a browser at http://localhost:3000

To stop the docker container, run

    npm run docker-stop
