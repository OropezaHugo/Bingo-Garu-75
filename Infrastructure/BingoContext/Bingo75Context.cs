using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.BingoContext;

public class Bingo75Context(DbContextOptions options): DbContext(options)
{
    public DbSet<Card> Cards { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<GameCards> GameCards { get; set; }
    public DbSet<RoundPatterns> RoundPatterns { get; set; }
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
        
        
        modelBuilder.Entity<RoundPatterns>()
            .HasKey(cards => new
            {
                cards.RoundId,
                cards.PatternId,
            });
        
        modelBuilder.Entity<RoundPatterns>().HasOne(gc => gc.Round)
            .WithMany(r => r.RoundPatterns)
            .HasForeignKey(gc => gc.RoundId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<RoundPatterns>().HasOne(gc => gc.Pattern)
            .WithMany(p => p.RoundPatterns)
            .HasForeignKey(gc => gc.PatternId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Card)
            .WithMany(c => c.Prizes)
            .HasForeignKey(p => p.CardId)
            .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Pattern)
            .WithMany(pt => pt.Prizes)
            .HasForeignKey(p => p.PatternId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Prize>()
            .HasOne(p => p.Round)
            .WithMany(r => r.Prizes)
            .HasForeignKey(p => p.RoundId)
            .OnDelete(DeleteBehavior.Restrict); 
        base.OnModelCreating(modelBuilder);
    }
}