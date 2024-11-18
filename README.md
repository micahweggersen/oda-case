# How to start the project

1. Clone the project
2. Install the dependencies and start the project

   `yarn install`

   followed by

   `yarn start`

   this will start the project at http://localhost:3000

   Next, you need to start the server which handles proxy requests from the client to the API. To do this, open a new terminal and run the following commands from the root of the project:

   `cd backend`

   This is the server directory. Install the dependencies using python. You can do this by running the following command:

   `pip install -r requirements.txt`

   Next, run the server using the following command:

   `python api.py`

   This will start the server at http://localhost:5000

## Backend

The backend is a Flask server that serves as a proxy to the API. The server is located in the `api` directory. The server is a simple Flask server that listens on port 5000. The server has multiple endpoints and could be more optimized if time allowed. The server is responsible for forwarding requests to the ODA API and caching the responses.

## Endpoints

### 1. `/proxy/oda/query` (GET)

- **Description**: Forwards a query to the ODA API.
- **Parameters**:
  - `q` (required): The query string to search for.
- **Response**: JSON data from the ODA API corresponding to the query.
- **Caching**: Responses are cached based on query parameters.

---

### 2. `/proxy/oda/all` (GET)

- **Description**: Retrieves all items from the ODA API without any query parameters.
- **Response**: JSON data from the ODA API.
- **Caching**: Responses are cached globally (no query parameters).

---

### 3. `/proxy/oda/filter` (GET)

- **Description**: Forwards a query with filters to the ODA API.
- **Parameters**:
  - `q` (required): The query string to search for.
  - `filters` (optional): Filters to refine the search.
- **Response**: Filtered JSON data from the ODA API.
- **Caching**: Responses are cached based on query parameters.

## Frontend

It has the following main components:

1. Filtered Search: This component is used to search for items in the ODA API. The user can enter a query string and apply filters to refine the search results. The main goal is to query the API and display the results in a organized manner.
2. "Ditt Oda" Section: Live search of all products in the ODA API. The user will receive a list of all products in the API as they are typing. There is a small delay to prevent too many requests to the server.
3. Cart: This component is used to display the items that the user has added to the cart. The user can remove items from the cart. The focus is to use information across the application to display the cart in a organized manner.

## Improvements

1. Functional category search
2. Add more filters
3. Overhaul the UI in regardes to accessibility and responsiveness, should be some accessibility already but could be improved.
4. Ditt Oda could use AI to suggest products based on user behavior, search history and persnal list data.
5. Fun and interactive UI elements to make the user experience more engaging. For example, animations, transitions, and other interactive elements.
6. The list goes on...

# Design Decisions

The project has focused on modular design decitions to improve maintainability, scalability and readability. There is also a focus on using TypeScript as it creates more reliable and less error prone code. Types is in my opinion a must have when dealing with large api's and complex data structures. This is especially important in larger projects where the codebase can become complex and harder to maintain.

That is also why useContext is used to manage global state. This makes it easier to share data between components and reduces the need for prop drilling which can make the code harder to read and maintain.

The project is also using a proxy server to handle requests to the ODA API. This is done to avoid CORS issues and to cache responses to reduce the number of requests to the API. The server is a Flask server that forwards requests to the ODA API and caches the responses. I have not spent much time on this aspect as i wanted to focus on interacting with the API and displaying the data in a organized manner.

# Challenges

The api is good to use but since there are no availabe documentation that i know of you need to reversengeneer the api and discover how its used. The challenge is to understand how the API works and how to query it to get the desired results. But once you understand how the API works, it is relatively easy to query it and get the data you need.

# More time

With more time i would have focused on AI integraiotns. I see this area as a lot of potential that can benfit and improve user experience.
I would also have taken more time to plan the project. This aspect of engeneering is one of the most important parts of getting a good end result.
