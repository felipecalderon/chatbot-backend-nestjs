# Chatbot Avanzado con Socket.IO + WooCommerce + OpenAI (NestJS)

---

## 1. Objetivo del Proyecto

Crear un chatbot en tiempo real que:

- Responda consultas de productos/precios conectando con WooCommerce (WordPress).
- Use OpenAI para interpretar lenguaje natural.
- Exponga un gateway WebSocket (Socket.IO) para interacción directa con el usuario.
- Esté preparado para escalar modularmente, integrar logs, estado de sesión y validación robusta.

---

## 2. Stack Tecnológico

- **Backend**: NestJS
- **Comunicación en Tiempo Real**: Socket.IO
- **IA**: OpenAI (GPT)
- **E-commerce API**: WooCommerce REST API
- **Integración HTTP**: `@nestjs/axios`
- **Gestión de configuración**: `@nestjs/config`
- **ORM**: mongoose
- **Logger**: built-in text-based logger
- **Testing**: @nestjs/testing + Supertest
- **Validaciones DTO**: `class-validator`, `class-transformer`

---

## 3. Librerías y Uso

| Propósito                   | Librería                                           | Uso/Notas                                  |
| --------------------------- | -------------------------------------------------- | ------------------------------------------ |
| API HTTP                    | `@nestjs/axios`                                    | Wrapper Axios para llamadas externas       |
| Configuración               | `@nestjs/config`                                   | Carga y validación de variables de entorno |
| Validaciones DTO            | `class-validator`, `class-transformer`             | Validación de payloads                     |
| Comunicación en tiempo real | `@nestjs/websockets`, `@nestjs/platform-socket.io` | WebSocket Gateway                          |
| Integración con OpenAI      | `axios` (manual) o cliente oficial                 | Abstraer en `openai.client.ts`             |
| Logger                      | `winston` o `pino`                                 | Logging centralizado                       |
| Testing                     | `jest`, `supertest`                                | Unit y E2E tests                           |
| Seguridad (opcional)        | `helmet`, `csurf`                                  | Protección adicional si hay REST           |
| ORM (opcional)              | `@nestjs/typeorm` o `@nestjs/prisma`               | Solo si se requiere persistencia           |
| Rate Limit API externa      | `bottleneck`                                       | Control de llamadas a OpenAI / WooCommerce |

---

## 4. Requerimientos Funcionales

- [x] Los usuarios deben poder conectarse vía WebSocket y mantener una sesión única.
- [x] El chatbot debe procesar mensajes de texto y entender intenciones del usuario.
- [x] El chatbot debe consultar productos y precios a WooCommerce en tiempo real.
- [x] Las respuestas deben ser generadas en lenguaje natural usando OpenAI.
- [x] El sistema debe registrar logs de errores y flujos críticos.
- [x] La configuración debe ser centralizada y sensible al entorno.

---

## 5. Requerimientos No Funcionales

- Escalable y modular.
- Separación estricta entre lógica de negocio, infraestructura y transporte.
- Pruebas unitarias cubriendo al menos 70% de los servicios clave.
- El entorno debe poder levantarse fácilmente con `Docker`.
- Manejable vía entorno `.env` para múltiples entornos (dev, staging, prod).

---

## 6. Recomendaciones Técnicas

### Arquitectura

- Toda lógica de negocio debe residir en los `services`, no en gateways ni controllers.
- Crear un cliente HTTP para OpenAI y otro para WooCommerce.
- Desacoplar la construcción de prompts en una capa distinta del cliente OpenAI.
- Usar interceptores para logging, pipes para sanitización, y filtros para errores globales.

### WebSocket

- Implementar un `middleware` para autenticar conexiones WebSocket si se requiere.
- Utilizar eventos estandarizados (`user_message`, `bot_reply`, `error`).
- Limitar el número de conexiones simultáneas por IP si es público.

### OpenAI

- Implementar cache o cooldown si se detecta repetición de prompts.
- Manejar errores de red, timeouts y rate limits (con `bottleneck` si es necesario).
- Usar modelo `gpt-4o-mini` por defecto, con posibilidad de escalar a `o4-mini`.

### WooCommerce

- Consumir API REST con autenticación básica (`consumer_key`, `consumer_secret`).
- Normalizar los datos en DTOs para desacoplar del formato nativo de Woo.

### Seguridad

- Sanitizar todo input de usuario antes de enviarlo a OpenAI.
- No exponer detalles internos del sistema en respuestas de error.
- Validar y limitar payloads por tamaño y frecuencia.

---

## 7. Estructura de Archivos

src/
│
├── main.ts # Bootstrap principal
├── app.module.ts # Módulo raíz
│
├── chat/ # Módulo del chatbot
│ ├── chat.gateway.ts # Gateway de Socket.IO
│ ├── chat.service.ts # Lógica principal del chat
│ ├── chat.module.ts
│ ├── session/ # Estado de conversación por usuario
│ │ ├── chat-session.service.ts
│ │ └── chat-session.interface.ts
│ └── prompts/ # Construcción de prompts
│ ├── prompt-builder.service.ts
│ └── templates.ts
│
├── openai/ # Cliente OpenAI aislado
│ ├── openai.service.ts
│ ├── openai.module.ts
│ └── openai.client.ts # Wrapper bajo nivel para llamadas
│
├── products/ # Acceso a productos desde WooCommerce
│ ├── products.service.ts
│ ├── products.controller.ts # Solo si se exponen endpoints HTTP
│ ├── products.module.ts
│ ├── dtos/
│ │ └── product.dto.ts
│ └── interfaces/
│ └── product.interface.ts
│
├── wordpress/ # Comunicación con WordPress
│ ├── wordpress.module.ts
│ ├── wordpress.service.ts
│ └── woocommerce/ # Submódulo específico para Woo
│ ├── woocommerce.service.ts
│ ├── woocommerce.client.ts # Wrapper bajo nivel API
│ └── dtos/
│ └── woocommerce-product.dto.ts
│
├── common/ # Utilidades compartidas
│ ├── constants/
│ │ ├── socket-events.ts
│ │ └── system-messages.ts
│ ├── interfaces/
│ │ ├── message.interface.ts
│ │ └── error.interface.ts
│ ├── utils/
│ │ ├── sanitize-input.ts
│ │ └── price-formatter.ts
│ ├── filters/ # Manejo global de errores
│ │ └── http-exception.filter.ts
│ └── pipes/ # Validaciones personalizadas
│ └── sanitize.pipe.ts
│
├── config/ # Configuración centralizada
│ ├── config.module.ts
│ ├── config.service.ts
│ ├── schemas/ # Validación de env vars con Joi
│ │ └── config.schema.ts
│ └── environments/ # Config por entorno
│ ├── development.ts
│ ├── production.ts
│ └── staging.ts
│
├── events/ # Eventos del dominio interno
│ ├── events.module.ts
│ └── handlers/
│ └── product-viewed.handler.ts
│
├── middleware/ # Middlewares personalizados
│ └── socket-auth.middleware.ts
│
├── logger/ # Sistema de logging
│ ├── logger.module.ts
│ └── logger.service.ts
│
├── database/ # Si persistes algo (chat logs, usuarios, etc.)
│ ├── database.module.ts
│ ├── entities/
│ │ └── chat-log.entity.ts
│ ├── repositories/
│ │ └── chat-log.repository.ts
│ └── migrations/
│
└── tests/ # Tests unitarios e2e
├── chat/
├── products/
└── openai/

---

## 8. Entorno `.env`

```env
NODE_ENV=development
PORT=3000

# OpenAI
OPENAI_API_KEY=sk-...

# WooCommerce
WOOCOMMERCE_BASE_URL=https://tu-sitio.com/wp-json/wc/v3
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...

# Otros
LOG_LEVEL=debug
```
