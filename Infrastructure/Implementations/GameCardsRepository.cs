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

    public bool ExistsAnySerialGameRelation(int gameId)
    {
        return context.GameCards.Any(gameCards => gameCards.GameId == gameId);
    }


    public bool ExistsGameCardRelation(int gameId, int cardId)
    {
        return context.GameCards.Any(gameCards => gameCards.GameId == gameId && gameCards.CardId == cardId);
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

    public GameCards? GetGameCard(int gameId, int cardId)
    {
        return context.GameCards.FirstOrDefault(gameCards => gameCards.GameId == gameId && gameCards.CardId == cardId);
    }

    public void SellGameCards(GameCards gameCards)
    {
        context.GameCards.Update(gameCards);
    }

    public async Task<List<GameCards>> ListAllGameCards()
    {
        return await context.GameCards.ToListAsync();
    }
}