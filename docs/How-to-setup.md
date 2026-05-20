# How to Setup

Simple guide to get the Health Insurance Management System running.

## Prerequisites

- .NET 10 SDK
- PostgreSQL

## First Time Setup

### 1. Configure JWT Authentication

```bash
cd Server
dotnet user-jwts create
```

### 2. Generate HTTPS Certificates

```bash
dotnet dev-certs https --trust
```

### 3. Configure Database

Edit `Server/appsettings.json` if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost; Database=BaoHiemSucKhoe; Username=postgres; Password=postgres"
}
```

### 4. Apply Database Migrations

```bash
cd Server
dotnet ef database update
```

---

## Running the Project

### Terminal 1 — Backend

```bash
cd Server
dotnet run
```

- API: `https://localhost:7267`
- Scalar API UI: `https://localhost:7267/scalar/v1`

### Terminal 2 — Frontend (Blazor WebAssembly)

```bash
cd Client
dotnet run
```

- App: `https://localhost:7200`

---

## Common Commands

### Backend

```bash
# Run
dotnet run --project Server

# Build
dotnet build Server

# Add migration
dotnet ef migrations add <MigrationName> --project Server

# Apply migration
dotnet ef database update --project Server
```

### Frontend

```bash
# Run dev server
dotnet run --project Client

# Build
dotnet build Client
```

---

## Troubleshooting

1. **JWT Authentication fails** — Run `dotnet user-jwts create` in the `Server` folder
2. **HTTPS certificate error** — Run `dotnet dev-certs https --trust`
3. **Database connection fails** — Verify PostgreSQL is running and `connection string` is correct
