var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors(policyBuilder =>
{
    policyBuilder
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:4200");
});
app.MapControllers();

app.Run();
