# GraphQL Notes Backend

Backend for a notes application built with NestJS and GraphQL.

## Technologies

- NestJS
- GraphQL
- TypeScript
- Supabase (PostgreSQL)
- @supabase/supabase-js

## Installation

```bash
# Install dependencies
$ yarn install

# Create .env file
$ cp .env.example .env
```

## Supabase Setup

1. Create a project on [Supabase](https://supabase.com)
2. Configure environment variables in `.env` file:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

## Running the Project

```bash
# Development
$ yarn run start

# Watch mode
$ yarn run start:dev

# Production
$ yarn run start:prod
```

## GraphQL API

### Queries

- `notes`: Get all notes
- `note(id: ID!)`: Get note by ID

### Mutations

- `createNote(input: CreateNoteInput!)`: Create a new note
- `updateNote(id: ID!, input: UpdateNoteInput!)`: Update existing note
- `deleteNote(id: ID!)`: Delete note

## Testing

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Project Structure

```
src/
├── notes/           # Notes module
│   ├── dto/        # Data Transfer Objects
│   ├── entities/   # Database entities
│   └── notes.resolver.ts
├── app.module.ts   # Main module
└── main.ts         # Entry point
```

## License

MIT
