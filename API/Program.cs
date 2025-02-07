using System.Net;
using API.Profiles;
using API.Tools;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Infrastructure.Implementations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<Bingo75Context>(optionsBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("Bingo75ConnectionString");
    optionsBuilder.UseSqlServer(connectionString);
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IRoundPatternsRepository, RoundPatternsRepository>();
builder.Services.AddScoped<IGameCardsRepository, GameCardsRepository>();
builder.Services.AddAutoMapper(typeof(PatternProfile));
builder.Services.AddAuthentication();
builder.Services.AddControllers();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<Bingo75Context>()
    .AddDefaultTokenProviders();

var app = builder.Build();

app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<AppUser>();
app.MapFallbackToController("Index", "Fallback");
using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    await SeedUsers.CreateUsers(userManager);
}

app.Run();

