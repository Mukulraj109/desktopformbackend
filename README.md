# Backend Server for Submission Management

This is a TypeScript-based Express server for managing submissions with endpoints to save, retrieve, update, and delete submissions. It uses a JSON file as a database to store submissions locally.

## Features

- **Ping Endpoint**: Check server availability.
- **Submit Endpoint**: Save new submissions.
- **Read Endpoint**: Retrieve saved submissions.
- **Delete Endpoint**: Remove submissions by index.
- **Edit Endpoint**: Update submissions by index.

## Technologies Used

- Node.js
- Express.js
- TypeScript


## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) or yarn

## Installation

1. **Clone the repository**: First, you will need to clone the repository to your local machine. You can do this with the following command:

   ```https://github.com/Mukulraj109/desktopformbackend.git```
   


2. **Install dependencies**:
- npm install

3. **Running the Server**:
Build the TypeScript files (if not already built):
- npm run build

- To start the backend server, use the following command:
1. npm start
2. The server will run at http://localhost:3000.

## API Endpoints

1. **Ping Endpoint**

- GET `/ping`
- Method: GET
- Response: true (indicating the server is up and running)

2. **Submit Endpoint**

- URL: `/submit`
- Description: Submits a form with the following - - parameters: name, email, phone, github_link, stopwatch_time.

- Method: POST
- Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "github_link": "https://github.com/johndoe",
  "stopwatch_time": "00:30:00"
}

```
- Response: { "success": true }
3. **Read Endpoint**

- Description: Retrieves a form submission by its index.
- URL: `/read`
- Method: GET
- Query Parameter: index (0-indexed)
- Example: /read?index=0
- Response: JSON object representing the form submission
4. **Delete Endpoint**

- Description: Deletes a form submission by its index.
- URL: `/delete`
- Method: DELETE
- Query Parameter: index (0-indexed)
- Example: /delete?index=0 or DELETE /delete?index=<index>

- Response: { "success": true }

5. **Editing a Submitted Form** (PUT Request)

-To edit a previously submitted form, you can use the `/edit` endpoint with a `PUT` request.

### Endpoint URL
- `http://localhost:3000/edit`

### Request Parameters
- `index`: Specify the index (or ID) of the submission you want to edit as a query parameter in the URL. For example, to edit the submission at index `0`, use `?index=0`.

### Request Body
- Select `raw` and `JSON (application/json)` from the dropdown menu.
- Provide updated data fields in the JSON format. Example:
  ```json
  {
      "name": "Updated Name",
      "email": "updated@email.com",
      "phone": "1234567890",
      "github_link": "https://github.com/updated",
      "stopwatch_time": "01:30:00"
  }

### Sending the Request
- Set the request type to PUT.
- Enter the endpoint URL with the appropriate index query parameter.
- Enter the JSON payload in the request body.
- Click on "Send" to submit the request to the server.
#### Expected Response
- If the update is successful, you will receive a JSON response { "success": true }.
- Handle any errors or status codes based on the server's response.


## Error Handling
- If any required parameters are missing or invalid, appropriate error messages and status codes (400 Bad Request) will be returned.
- For invalid indices or non-existing submissions, a 404 Not Found error will be returned.


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
5. **Edit Endpoint**
   - Set the request type to `PUT`.
   - Enter the URL: `http://localhost:3000/edit?index=0` (Replace `0` with the index of the submission you want to edit).
   - Navigate to the "Body" tab.
   - Select `raw` and choose `JSON (application/json)` from the dropdown.
   - Update the fields you want to edit in the JSON payload. For example:

     ```json
     {
       "name": "Updated Name",
       "email": "updated.email@example.com",
       "phone": "9876543210",
       "github_link": "https://github.com/updated",
       "stopwatch_time": "02:00:00"
     }
     ```
   - Click on "Send". You should receive a response with `{ "success": true }`, indicating that the update was successful.

6. **Additional Notes**
   - Ensure that the server (`npm start`) is running locally before making requests from Postman.
   - Handle any errors or exceptions based on the API documentation provided in this README.

   - This testing guide should help you validate the functionality of each API endpoint using Postman.


## Notes
- This server uses a JSON file (db.json) as a simple database to store form submissions.
- Ensure proper error handling and validation are implemented for production use.
