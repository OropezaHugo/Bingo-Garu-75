using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations;

public class GameCardsRepository(Bingo75Context context): IGameCardsRepository
{
    public bool ExistsSerialInAnyGame(int serialId)
    {
        return context.GameCards.Join(context.Cards.Where(c => c.SerialId == serialId), gameCards => gameCards.CardId, card => card.Id, (gameCards, card) => gameCards).Any(); 
    }

    public bool ExistsSerialGameRelation(int gameId, int serialId)
    {
        return context.GameCards
            .Join(context.Cards
                .Where(c => c.SerialId == serialId), 
                gameCards => gameCards.CardId, 
                card => card.Id, 
                (gameCards, card) => gameCards)
            .Any(gameCards => gameCards.GameId == gameId);
    }

    public void CreateCardGameRelation(GameCards gameCards)
    {
        context.GameCards.Add(gameCards);
    }

    public void CreateSerialGameRelation(int gameId, int serialId)
    {
        
        if (context.Games.Find(gameId) == null) return;
        if (context.Serials.Find(serialId) == null) return;
        foreach (Card card in context.Cards.Where(c => c.SerialId == serialId))
        {
            CreateCardGameRelation(new GameCards()
            {
                GameId = gameId,
                CardId = card.Id,
            });
        }
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<List<Card>> ListCardsByGameId(int gameId)
    {
        return await context.Cards.Where(
            card => 
                context.GameCards.Any(
                    gameCards => gameCards.CardId == card.Id
                                    && gameCards.GameId == gameId
                )
        ).ToListAsync();
    }

    public void DeleteGameCardRelation(GameCards gameCards)
    {
        context.GameCards.Remove(gameCards);
    }

    public GameCards? GetGameCards(int gameId, int cardId)
    {
        return context.GameCards.FirstOrDefault(gameCards => gameCards.GameId == gameId && gameCards.CardId == cardId);
    }
}