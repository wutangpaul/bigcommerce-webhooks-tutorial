## Install

`npm install`

## Fire up express server

`nodemon index.js`

## Fire up ngrok in root of project

In a separate terminal, run the following command and note the forwarding URLs. This will be used below to forward the webhook request that dials out from bigcommerce to your express application
`./ngrok http 3000`

## Subscribe to bigcommerce webhook

Create a POST request to URL:https://api.bigcommerce.com/stores/{{store_hash}}/v2/hooks. Replace "store_hash" with the value from your store’s API path.

Create a request body where "scope" is the webhook event we are subscribing to and "destination" is your ngrok forwarding url with /webhooks appended (the route specified in our Express app):

```json
{
  "scope": "store/product/updated",
  "destination": "https://6a35e97b.ngrok.io/webhooks",
  "is_active": true
}
```

Update the request headers to contain:

```json
    Accept: application/json
    Content-Type: application/json
    X-Auth-Client: {{the OAuth client id}}
    X-Auth-Token: {{the OAuth token}}
```

Check all the values and then send. If successful, the response will be 201 Created.

201 Created Response

```json
{
  "id": 14263419,
  "client_id": "your-client-id",
  "store_hash": "your-store-hash",
  "scope": "store/product/updated",
  "destination": "https://6a35e97b.ngrok.io/webhooks",
  "headers": null,
  "is_active": true,
  "created_at": 1531256030,
  "updated_at": 1531256030
}
```

## Test the webhook

Log into big commerce, update a product, observe the incoming HTTP payload from bigcommerce into your express app.
