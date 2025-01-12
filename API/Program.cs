using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Bingo75Context>(optionsBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("Bingo75ConnectionString");
    optionsBuilder.UseSqlServer(connectionString);
});
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
