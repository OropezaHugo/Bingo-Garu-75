using API.Profiles;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Infrastructure.Implementations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Bingo75Context>(optionsBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("Bingo75ConnectionString");
    optionsBuilder.UseSqlServer(connectionString);
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IGamePatternsRepository, GamePatternsRepository>();
builder.Services.AddScoped<IGameCardsRepository, GameCardsRepository>();
builder.Services.AddAutoMapper(typeof(PatternProfile));
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
