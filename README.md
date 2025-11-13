# Event-Driven Microservice (TypeScript)


This repository contains a DDD-inspired TypeScript microservice that ingests simulated user activity events via Kafka, processes them asynchronously, persists to MongoDB, and exposes a REST API for queries with pagination and filtering.


## What you'll find
- Full TypeScript codebase following DDD boundaries (domain, application, infrastructure, presentation)
- Kafka producer endpoint for generating simulated events
- Kafka consumer that processes events and persists to MongoDB
- Express REST API with pagination & filtering (`/api/logs`)
- Dockerfile (multi-stage) and docker-compose for local dev (Kafka + Zookeeper + Mongo)
- Kubernetes manifests (Deployment, Service, ConfigMap, Secret) for deployment


## Quickstart (local)
1. Copy `.env.example` to `.env`
2. `docker-compose up --build`
3. `npm run dev` or use the built image
4. POST sample events to `http://localhost:3000/producer/produce`
5. GET processed logs from `http://localhost:3000/api/logs`


## DDD & architecture notes
(See full write-up in repository) — briefly: domain models and interfaces live in `src/domain`, use-cases in `src/application`, infrastructure adapters in `src/infrastructure`, and HTTP/presentation in `src/presentation`.


---