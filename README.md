# Backend Server for Submission Management

This is a TypeScript-based Express server for managing submissions with endpoints to save, retrieve, update, and delete submissions. It uses a JSON file as a database to store submissions locally.

## Features

- **Ping Endpoint**: Check server availability.
- **Submit Endpoint**: Save new submissions.
- **Read Endpoint**: Retrieve saved submissions.
- **Delete Endpoint**: Remove submissions by index.

## Technologies Used

- Node.js
- Express.js
- TypeScript


## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) or yarn

## Installation

1. **Clone the repository**: First, you will need to clone the repository to your local machine. You can do this with the following command:

   ```https://github.com/Mukulraj109/.git```
   


2. **Install dependencies**:
- npm install

3. **Running the Server**:
Build the TypeScript files (if not already built):
- npm run build

- To start the backend server, use the following command:

- npm start
The server will run at http://localhost:3000.

## API Endpoints

1. **Ping Endpoint**

GET `/ping`
Method: GET
Response: true (indicating the server is up and running)

2. **Submit Endpoint**

URL: `/submit`
Description: Submits a form with the following parameters: name, email, phone, github_link, stopwatch_time.

Method: POST
Request Body:
```json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "github_link": "https://github.com/johndoe",
  "stopwatch_time": "00:30:00"
}

```
Response: { "success": true }
3. **Read Endpoint**

Description: Retrieves a form submission by its index.
URL: `/read`
Method: GET
Query Parameter: index (0-indexed)
Example: /read?index=0
Response: JSON object representing the form submission
4. **Delete Endpoint**

Description: Deletes a form submission by its index.
URL: `/delete`
Method: DELETE
Query Parameter: index (0-indexed)
Example: /delete?index=0 or DELETE /delete?index=<index>

Response: { "success": true }

## Error Handling
If any required parameters are missing or invalid, appropriate error messages and status codes (400 Bad Request) will be returned.
For invalid indices or non-existing submissions, a 404 Not Found error will be returned.


## Testing with Postman

To test the Submission Backend API endpoints using Postman:

1. **Ping Endpoint**
   - Open Postman.
   - Set the request type to `GET`.
   - Enter the URL: `http://localhost:3000/ping`.
   - Click on "Send". You should receive a response with `true`, indicating that the server is running.

2. **Submit Endpoint**
   - Set the request type to `POST`.
   - Enter the URL: `http://localhost:3000/submit`.
   - Navigate to the "Body" tab.
   - Select `raw` and choose `JSON (application/json)` from the dropdown.
   - Enter the following JSON payload:

     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "phone": "1234567890",
       "github_link": "https://github.com/johndoe",
       "stopwatch_time": "01:30:00"
     }
     ```
   - Click on "Send". You should receive a response with `{ "success": true }`, indicating that the submission was successful.

3. **Read Endpoint**
   - Set the request type to `GET`.
   - Enter the URL: `http://localhost:3000/read?index=0` (Replace `0` with the index of the submission you want to retrieve).
   - Click on "Send". You should receive a response with the details of the submission.

4. **Delete Endpoint**
   - Set the request type to `DELETE`.
   - Enter the URL: `http://localhost:3000/delete?index=0` (Replace `0` with the index of the submission you want to delete).
   - Click on "Send". You should receive a response with `{ "success": true }`, indicating that the deletion was successful.

5. **Additional Notes**
   - Ensure that the server (`npm start`) is running locally before making requests from Postman.
   - Handle any errors or exceptions based on the API documentation provided in this README.

This testing guide should help you validate the functionality of each API endpoint using Postman.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Notes
- This server uses a JSON file (db.json) as a simple database to store form submissions.
- Ensure proper error handling and validation are implemented for production use.
