using Core.Entities;

namespace Core.Interfaces;

public interface IGameCardsRepository
{
    
    bool ExistsSerialInAnyGame(int serialId);
    bool ExistsAnySerialGameRelation(int gameId);
    bool ExistsGameCardRelation(int gameId, int cardId);
    void CreateCardGameRelation(GameCards gameCards);
    void CreateSerialGameRelation(int gameId, int serialId);
    Task<bool> SaveChangesAsync();
    Task<List<Card>> ListCardsByGameId(int gameId);
    void DeleteGameCardRelation(GameCards gameCards);
    GameCards? GetGameCard(int gameId, int cardId);
    void SellGameCards(GameCards gameCards);
    Task<List<GameCards>> ListAllGameCards();
}