# NestJS REST-to-gRPC microservices example

This repository contains two independent NestJS projects and no API gateway.

The example models a realistic order workflow: a client creates an order through REST,
then order-service reserves stock from inventory-service over gRPC. The order is saved
only when the stock reservation succeeds.

```text
Swagger / REST client
        |
        | POST /orders
        v
  order-service :3002
        |
        | ReserveInventory(sku, quantity) [gRPC]
        v
inventory-service :5001
        |
        | reserved / insufficient stock / unknown SKU
        v
  order confirmed or REST error returned
```

Each service has its own `package.json`, lockfile, `.env`, Nest configuration, source
tree, and protobuf contract. There are no shared runtime files between the projects.

## Run

Use two terminals:

```bash
# terminal 1
cd inventory-service
npm ci
npm run start:dev
```

```bash
# terminal 2
cd order-service
npm ci
npm run start:dev
```

## Test REST to gRPC from Swagger

Open order-service Swagger at `http://localhost:3002/swagger`. Execute `POST /orders`
with:

```json
{
  "customerName": "Ada Lovelace",
  "sku": "LAPTOP-001",
  "quantity": 2
}
```

The REST request triggers this service-to-service gRPC call:

```text
OrderHttpController
  -> OrderService.create()
  -> InventoryClient.reserve()
  -> InventoryService.ReserveInventory() over gRPC
```

Seeded inventory:

| SKU | Name | Initial quantity |
| --- | --- | ---: |
| `LAPTOP-001` | Developer Laptop | 5 |
| `MOUSE-001` | Wireless Mouse | 20 |

Useful failure tests:

- Request more than 5 laptops to receive HTTP `409 Conflict` from a gRPC
  `FAILED_PRECONDITION` error.
- Use an unknown SKU to receive HTTP `404 Not Found` from gRPC `NOT_FOUND`.
- Stop inventory-service to receive HTTP `502 Bad Gateway` from order-service.

## Documentation

| Service | Swagger UI | Scalar | gRPC |
| --- | --- | --- | --- |
| inventory-service | `http://localhost:3001/swagger` | `http://localhost:3001/reference` | `localhost:5001` |
| order-service | `http://localhost:3002/swagger` | `http://localhost:3002/reference` | gRPC client |

The inventory HTTP API lets you inspect current stock at `GET /inventory`. The actual
order workflow uses gRPC, not that HTTP API, for reservations.

## Verify

Run inside either service directory:

```bash
npm run build
npm test
npm run lint
```
