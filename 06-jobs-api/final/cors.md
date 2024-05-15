Let's say you have an API server at https://api.example.com and a client application hosted at
https://client.example.com. If you want to allow the client to make requests to the API, the server
would need to include headers in its responses that look something like this:

Access-Control-Allow-Origin: https://client.example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
These headers tell the browser that the client at https://client.example.com is allowed to send requests to https://api.example.com using methods GET, POST, and PUT, with the headers Content-Type and Authorization, and that credentials can be included.
