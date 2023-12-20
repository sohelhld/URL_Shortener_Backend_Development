# URL_Shortener_Backend_Development

URL Shortener Service
This project is a simple URL shortener service with user authentication. Users can sign up, log in, and generate shortened URLs.


Install dependencies:
# npm install

Start the server:
# npm start
The server will run on http://localhost:8080.

**Endpoints**:-
User #Signup
Endpoint: **POST /user/signup**
Description: Register a new user.
Request Body:
          
            {
            "username": "your_username",
            "password": "your_password"
            }
           
User #Login
Endpoint: **POST /user/login**
Description: Authenticate and log in a user.
Request Body:

            {
            "username": "your_username",
            "password": "your_password"
            }

    # ****ONLY AFTER USER SIGNUP AND LOGIN THEN BLOW ENDPOINT IS ACCESSIBLE****
URL #Shorten
Endpoint:**POST /shorten**
Description: Generate a shortened URL for an authenticated user.
Request Body:

            {
            "url": "https://www.example.com/your-long-url"
            }
Response Body:

            {
            "originalURL": "https://www.example.com/your-long-url",
            "shortURL": "http://localhost:8080/abcd1234"
            }

# Sign up for a new user using the /user/signup endpoint.
# Log in using the /user/login endpoint.
# Generate a shortened URL using the /shorten endpoint.
