using System.Security.Cryptography.X509Certificates;
using System.Text;
using API.PostDTOs;
using API.Profiles;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Infrastructure.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<Bingo75Context>(optionsBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("Bingo75ConnectionString");
    optionsBuilder.UseSqlServer(connectionString);
});
var secretKey = builder.Configuration["Jwt:SecretKey"];
if (secretKey != null)
{
    var key = Encoding.UTF8.GetBytes(secretKey);

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });
}
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IRoundPatternsRepository, RoundPatternsRepository>();
builder.Services.AddScoped<IGameCardsRepository, GameCardsRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddAutoMapper(typeof(PatternProfile));
builder.Services.AddAuthentication();
builder.Services.AddControllers();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SelfOrCoachAccess", policyBuilder => 
        policyBuilder.Requirements.Add(new EmptyRequirement()));
});
builder.WebHost.ConfigureKestrel(options =>
{
    options.ConfigureHttpsDefaults(adapterOptions =>
    {
        adapterOptions.ServerCertificate = new X509Certificate2(
            "ssl/qwertyuiufvyivbjlbk.tryasp.net.pfx",
            "qwerty"
        );
    });
});

Log.Logger = new LoggerConfiguration()
    .WriteTo.File(
        "logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        fileSizeLimitBytes: 10_000_000,
        rollOnFileSizeLimit: true,
        retainedFileCountLimit: 30
    )
    .CreateLogger();

builder.Host.UseSerilog();

var app = builder.Build();

app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

app.UseSwagger();
app.UseSwaggerUI();
app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();

