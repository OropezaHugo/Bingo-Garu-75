using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.BingoContext;

public class Bingo75Context(DbContextOptions options): DbContext(options)
{
    public DbSet<Card> Cards { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<GameCards> GameCards { get; set; }
    public DbSet<GamePatterns> GamePatterns { get; set; }
    public DbSet<Pattern> Patterns { get; set; }
    public DbSet<Prize> Prizes { get; set; }
    public DbSet<Round> Rounds { get; set; }
    public DbSet<Serial> Serials { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameCards>()
            .HasKey(cards => new
            {
                cards.GameId,
                cards.CardId
            });
        modelBuilder.Entity<GameCards>()
            .HasOne(gc => gc.Game)
            .WithMany(g => g.GameCards)
            .HasForeignKey(gc => gc.GameId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<GameCards>().HasOne(gc => gc.Card)
            .WithMany(g => g.GameCards)
            .HasForeignKey(gc => gc.CardId)
            .OnDelete(DeleteBehavior.Cascade);
        
        
        modelBuilder.Entity<GamePatterns>()
            .HasKey(cards => new
            {
                cards.GameId,
                cards.PatternId,
            });
        
        modelBuilder.Entity<GamePatterns>().HasOne(gc => gc.Game)
            .WithMany(g => g.GamePatterns)
            .HasForeignKey(gc => gc.GameId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<GamePatterns>().HasOne(gc => gc.Pattern)
            .WithMany(g => g.GamePatterns)
            .HasForeignKey(gc => gc.PatternId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Card)
            .WithMany(c => c.Prizes)
            .HasForeignKey(p => p.CardId)
            .OnDelete(DeleteBehavior.Restrict); // Evitar cascada en CardId

        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Pattern)
            .WithMany(pt => pt.Prizes)
            .HasForeignKey(p => p.PatternId)
            .OnDelete(DeleteBehavior.Cascade); // Puedes dejar esta en cascada si es necesario

        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Round)
            .WithMany(r => r.Prizes)
            .HasForeignKey(p => p.RoundId)
            .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<Pattern>().HasData(
            new Pattern
            {
                Id = 1,
                PatternMatrix = new List<bool> 
                { 
                    true, false, false, false, true,
                    true, false, false, false, true,
                    true, true, true, true, true,
                    true, false, false, false, true,
                    true, false, false, false, true
                },
                PatternName = "H"
            },
            new Pattern
            {
                Id = 2,
                PatternMatrix = new List<bool> 
                { 
                    true, false, false, false, true,
                    false, false, false, false, false,
                    false, false, false, false, false,
                    false, false, false, false, false,
                    true, false, false, false, true
                },
                PatternName = "4 Esquinas"
            },
            new Pattern
            {
                Id = 3,
                PatternMatrix = new List<bool> 
                { 
                    false, false, true, false, false,
                    false, false, true, false, false,
                    false, false, true, false, false,
                    false, false, true, false, false,
                    false, false, true, false, false
                },
                PatternName = "Línea Vertical"
            }
        );

        DateOnly currentDate = DateOnly.FromDateTime(DateTime.UtcNow);

        modelBuilder.Entity<Serial>().HasData(
            new Serial
            {
                Id = 1,
                SerialName = "Serial-Default-50",
                CreationDate = currentDate,
                StrokeColor = "#000000",
                BoxFillColor = "#ffffff",
                CardFillColor = "#7b2cbf",
                CardNameColor = "#fca311",
                BoxNumberColor = "#7b2cbf",
                CardNumberColor = "#7b2cbf"
            }
        );

        base.OnModelCreating(modelBuilder);
    }
}