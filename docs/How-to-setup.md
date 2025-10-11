# How to setup guide

Simple guide to get the Health Insurance Management System running.

## Prerequisites

- .NET 8.0 SDK
- Node.js (v16+)
- PostgreSQL database

## First Time Setup

### 1. Configure JWT Authentication

```bash
cd ISD-Project.Server
dotnet user-jwts create
```

### 2. Generate HTTPS Certificates

```bash
# Windows (PowerShell/CMD)
mkdir "%APPDATA%\ASP.NET\https" 2>nul
dotnet dev-certs https --export-path "%APPDATA%\ASP.NET\https\isd-project.client.pem" --format Pem --no-password

# Windows (Git Bash) or Linux/Mac
mkdir -p "$HOME/AppData/Roaming/ASP.NET/https" || mkdir -p "$HOME/.aspnet/https"
dotnet dev-certs https --export-path "$HOME/AppData/Roaming/ASP.NET/https/isd-project.client.pem" --format Pem --no-password
```

### 3. Configure Database

Edit `ISD-Project.Server/appsettings.json` if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost; Database=BaoHiemSucKhoe; Username=postgres; Password=postgres"
}
```

### 4. Setup Database

```bash
cd ISD-Project.Server
dotnet ef database update
```

### 5. Install Frontend Dependencies

```bash
cd isd-project.client
npm install
```

---

## Running the Project

### Start Backend (Terminal 1)

```bash
cd ISD-Project.Server
dotnet run
```

Backend runs on: **http://localhost:5275**
Swagger UI: **http://localhost:5275/swagger**

### Start Frontend (Terminal 2)

```bash
cd isd-project.client
npm run dev
```

Frontend runs on: **https://localhost:5173**

---

## Common Commands

### Backend

```bash
# Run the server
dotnet run --project ISD-Project.Server

# Build
dotnet build

# Run tests
dotnet test

# Create migration
dotnet ef migrations add <MigrationName> --project ISD-Project.Server

# Update database
dotnet ef database update --project ISD-Project.Server
```

### Frontend

```bash
# Development server
npm run dev
```

---

## Troubleshooting

If you encounter errors:

1. **JWT Authentication fails**: Run `dotnet user-jwts create` in the Server project
2. **Certificate error in frontend**: Check that HTTPS certificates exist in `%APPDATA%\ASP.NET\https`
3. **Database connection fails**: Verify PostgreSQL is running and connection string is correct
