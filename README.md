<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  Advanced Chatbot with Socket.IO + WooCommerce + OpenAI (NestJS)
</p>

---

## 1. Project Objective

Create a real-time chatbot that:
- Responds to product/price queries by connecting with WooCommerce (WordPress).
- Uses OpenAI to interpret natural language.
- Exposes a WebSocket gateway (Socket.IO) for direct user interaction.
- Is prepared to scale modularly, integrate logs, session state, and robust validation.

---

## 2. Tech Stack

- **Backend**: NestJS
- **Real-time Communication**: Socket.IO
- **AI**: OpenAI (GPT)
- **E-commerce API**: WooCommerce REST API
- **HTTP Integration**: `@nestjs/axios`
- **Configuration Management**: `@nestjs/config`
- **ORM**: Mongoose
- **Logger**: Built-in text-based logger
- **Testing**: Supertest
- **DTO Validations**: `class-validator`, `class-transformer`

---

## 3. Functional Requirements

- [x] Users must be able to connect via WebSocket and maintain a unique session.
- [x] The chatbot must process text messages and understand user intentions.
- [x] The chatbot must query products and prices from WooCommerce in real time.
- [x] Responses must be generated in natural language using OpenAI.
- [x] The system must log errors and critical flows.
- [x] Configuration must be centralized and environment-sensitive.

---

## 4. Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm
- Docker (optional, for containerized environment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url.com/
   ```
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Configuration

1. Create a `.env` file in the root of the project, based on the `env.example` file.
2. Fill in the required environment variables:
   ```env
   NODE_ENV=development
   PORT=3000

   # OpenAI
   OPENAI_API_KEY=sk-...

   # WooCommerce
   WOOCOMMERCE_BASE_URL=https://your-site.com/wp-json/wc/v3
   WOOCOMMERCE_CONSUMER_KEY=ck_...
   WOOCOMMERCE_CONSUMER_SECRET=cs_...

   # Others
   LOG_LEVEL=debug
   ```

---

## 5. Running the Application

### Development

```bash
# Run in watch mode
pnpm run start:dev
```

### Production

```bash
# Build the application
pnpm run build

# Start the production server
pnpm run start:prod
```

### Docker

To run the application in a Docker container, use the following commands:

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up
```

---

## 6. Running Tests

```bash
# Unit tests
pnpm run test

# End-to-end (E2E) tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

---

## 7. Project Structure

The project follows a modular architecture, with key modules including:

- `chat`: Handles WebSocket communication and core chatbot logic.
- `openai`: Manages interaction with the OpenAI API.
- `wordpress`: Integrates with the WooCommerce API.
- `common`: Contains shared utilities, constants, and interfaces.
- `config`: Manages application configuration.

For a detailed view of the file structure, please refer to the `gemini.md` file.

---

## 8. License

This project is private and unlicensed.