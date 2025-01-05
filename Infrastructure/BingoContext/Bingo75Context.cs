using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.BingoContext;

public class Bingo75Context(DbContextOptions options): DbContext(options)
{
    public DbSet<Bingo75Card> Bingo75Cards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}