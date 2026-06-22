var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume();

var database = postgres.AddDatabase("DefaultConnection", "BaoHiemSucKhoe");

var server = builder.AddProject<Projects.Server>("server")
    .WithReference(database)
    .WaitFor(database)
    .WithHttpHealthCheck("/health");

var client = builder.AddBlazorWasmProject<Projects.Client>("client")
    .WithReference(server.GetEndpoint("http"));

var gateway = builder.AddBlazorGateway("gateway")
    .WithExternalHttpEndpoints()
    .WithBlazorClientApp(client);

// ApprovalStatusService builds links to the client app using this; the gateway path prefix
// matches the "client" resource name set above.
server.WithEnvironment("ClientBaseUrl", ReferenceExpression.Create($"{gateway.GetEndpoint("https")}/client"));

builder.Build().Run();
