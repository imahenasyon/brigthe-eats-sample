# Brighte Eats - Lead Generation System

Brighte would like to provide a system to accept expressions of interest for a new product and to view those leads in a dashboard. The new product is called **Brighte Eats**. We would like to know which of the following services customers are interested in:

- delivery
- pick-up
- payment

## Instructions:

### Setup

```bash
git clone git@github.com:imahenasyon/brigthe-eats-sample.git
cd brigthe-eats-sample/
yarn install
yarn build
yarn typeorm migration:run -d dist/data-source.js
```

### Testing

```bash
yarn test
```

### Running the application

```bash
yarn start:dev
```

The application will be running at `http://localhost:3000`.

## GraphQL API

You can use a tool like [Postman](https://www.postman.com/) to interact with the GraphQL API at `http://localhost:3000/graphql`.

### Register a new lead

Send a `POST` request to `http://localhost:3000/graphql` with the following body:

**GraphQL Mutation:**
```graphql
mutation {
  register(
    name: "Alice Summers"
    email: "alice.summers@example.com"
    mobile: "09171234511"
    postcode: "1600"
    services: ["delivery", "payment"]
  ) {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```

**Example Leads:**

1.  **Alice Summers**
    ```graphql
    mutation {
      register(
        name: "Alice Summers"
        email: "alice.summers@example.com"
        mobile: "09171234511"
        postcode: "1600"
        services: ["delivery", "payment"]
      ) {
        id
        name
        email
        mobile
        postcode
        services
      }
    }
    ```

2.  **Brian Castillo**
    ```graphql
    mutation {
      register(
        name: "Brian Castillo"
        email: "brian.castillo@example.net"
        mobile: "09981234522"
        postcode: "4026"
        services: ["pick-up"]
      ) {
        id
        name
        email
        mobile
        postcode
        services
      }
    }
    ```

3.  **Chloe Rivera**
    ```graphql
    mutation {
      register(
        name: "Chloe Rivera"
        email: "chloe.rivera@example.org"
        mobile: "09051234533"
        postcode: "6000"
        services: ["delivery", "pick-up", "payment"]
      ) {
        id
        name
        email
        mobile
        postcode
        services
      }
    }
    ```

### List all leads

Send a `POST` request to `http://localhost:3000/graphql` with the following body:

**GraphQL Query:**
```graphql
query Leads {
  leads {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```

### Get a single lead by ID

Send a `POST` request to `http://localhost:3000/graphql` with the following body:

**GraphQL Query:**
```graphql
query Lead {
  lead(id: 3) {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```
