using Core.Entities;

namespace Core.Interfaces;

public interface IGameCardsRepository
{
    
    bool ExistsSerialInAnyGame(int serialId);
    bool ExistsSerialGameRelation(int gameId, int serialId);
    void CreateCardGameRelation(GameCards gameCards);
    void CreateSerialGameRelation(int gameId, int serialId);
    Task<bool> SaveChangesAsync();
    Task<List<Card>> ListCardsByGameId(int gameId);
    void DeleteGameCardRelation(GameCards gameCards);
    GameCards? GetGameCards(int gameId, int cardId);
}