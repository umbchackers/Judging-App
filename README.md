# Judging App Backend

Express backend for the Judging App. Meant to be paired with the frontend, see the client directory at https://github.com/umbchackers/Judging-App/tree/master/client

Start by running `npm install` to install this package's dependencies

- To run both the back and frontend use `npm run both`
- To run the backend individually use `npm run server`
- To run the frontend individually use `npm run client`

## Configuring Google Sheets API

Working on this section... For now, contact @cmarkwell for help getting your .env file set up so that you can authenticate with the Google Sheets API

## API

Here's an overview of the server's endpoints

- `POST /login` accepts a username and password, returns a signed JWT
- `POST /logout` accepts a signed JWT, commands browser to delete JWT
- `GET /user/me` accepts a signed JWT, returns user object tied to JWT
- `GET /api/assignments` uses JWT from login to retrieve assignment list
- `POST /api/rankings` accepts JSON in the form of { "rankings": [{ project: "", rank: x }, {...}, {...}] }


