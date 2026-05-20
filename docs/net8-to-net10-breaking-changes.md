# Breaking Changes: .NET 8 → .NET 10 (Server Project)

## Target Framework

`net8.0` → `net10.0` in `Server.csproj`.

---

## OpenAPI / Swagger

The most significant breaking change. Swashbuckle is effectively abandoned for .NET 10 — its v10.x release removed the `Microsoft.OpenApi.Models` namespace, causing a compile error.

**Removed packages:**
- `Swashbuckle.AspNetCore`
- `Swashbuckle.AspNetCore.Filters`

**Added packages:**
- `Microsoft.AspNetCore.OpenApi` — built-in ASP.NET Core OpenAPI generation
- `Scalar.AspNetCore` — replaces Swagger UI

**`Program.cs` before:**
```csharp
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme { ... });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

app.UseSwagger();
app.UseSwaggerUI();
```

**`Program.cs` after:**
```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi; // note: no .Models sub-namespace

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});

app.MapOpenApi();           // serves /openapi/v1.json
app.MapScalarApiReference(); // serves /scalar/v1
```

The `SecurityRequirementsOperationFilter` is replaced by an `IOpenApiDocumentTransformer`:

```csharp
internal sealed class BearerSecuritySchemeTransformer(IAuthenticationSchemeProvider authenticationSchemeProvider) : IOpenApiDocumentTransformer
{
    public async Task TransformAsync(OpenApiDocument document, OpenApiDocumentTransformerContext context, CancellationToken cancellationToken)
    {
        var schemes = await authenticationSchemeProvider.GetAllSchemesAsync();
        if (schemes.Any(s => s.Name == "Bearer"))
        {
            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes = new Dictionary<string, IOpenApiSecurityScheme>
            {
                ["Bearer"] = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    In = ParameterLocation.Header,
                    BearerFormat = "Json Web Token"
                }
            };
        }
    }
}
```

**Key namespace change:** `Microsoft.OpenApi.Models` no longer exists. All OpenAPI types (`OpenApiSecurityScheme`, `SecuritySchemeType`, `ParameterLocation`, etc.) now live directly in `Microsoft.OpenApi`.

---

## Package Version Changes

| Package | .NET 8 | .NET 10 |
|---|---|---|
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 8.0.1 | 10.0.8 |
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | 8.0.1 | 10.0.8 |
| `Microsoft.AspNetCore.SpaProxy` | `8.*-*` | `10.*-*` |
| `Microsoft.EntityFrameworkCore.Design` | 8.0.1 | 10.0.8 |
| `Microsoft.EntityFrameworkCore.Tools` | 8.0.1 | 10.0.8 |
| `Microsoft.IdentityModel.Tokens` | 7.2.0 | 8.18.0 |
| `System.IdentityModel.Tokens.Jwt` | 7.2.0 | 8.18.0 |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | 8.0.0 | 10.0.1 |

---