# Very simple NestJS REST-to-gRPC example

This project has only two small services:

- `greeting-service`: receives a REST request from Swagger.
- `hello-service`: receives a gRPC call and returns a hello message.

There is no API gateway and no database.

```text
Browser / Swagger
       |
       | GET /greetings/Junior (REST)
       v
greeting-service :3002
       |
       | SayHello({ name: "Junior" }) (gRPC)
       v
hello-service :5001
       |
       | { message: "Hello, Junior! 👋" }
       v
greeting-service returns the response
```

## 1. Start hello-service

```bash
cd hello-service
npm ci
npm run start:dev
```

Its terminal will show:

```text
🚀 [HELLO SERVICE] HTTP running at http://localhost:3001
🟢 [HELLO SERVICE] gRPC listening at 0.0.0.0:5001
```

## 2. Start greeting-service

Open a second terminal:

```bash
cd greeting-service
npm ci
npm run start:dev
```

## 3. Test from Swagger

Open `http://localhost:3002/swagger`.

1. Open `GET /greetings/{name}`.
2. Click **Try it out**.
3. Enter `Junior`.
4. Click **Execute**.

Response:

```json
{
  "message": "Hello, Junior! 👋"
}
```

The greeting-service terminal shows:

```text
🌐 [GREETING SERVICE] REST request received for: Junior
📞 [GREETING SERVICE] Calling hello-service with gRPC...
✅ [GREETING SERVICE] gRPC response received: Hello, Junior! 👋
```

The hello-service terminal shows:

```text
📨 [HELLO SERVICE] gRPC request received for: Junior
📤 [HELLO SERVICE] Sending gRPC response: Hello, Junior! 👋
```

That is the entire service-to-service call.

## URLs

| Service | Swagger | Scalar | gRPC |
| --- | --- | --- | --- |
| hello-service | `http://localhost:3001/swagger` | `http://localhost:3001/reference` | `localhost:5001` |
| greeting-service | `http://localhost:3002/swagger` | `http://localhost:3002/reference` | client only |
