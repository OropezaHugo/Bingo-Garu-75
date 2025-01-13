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
        base.OnModelCreating(modelBuilder);
    }
}