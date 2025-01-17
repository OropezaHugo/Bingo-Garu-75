using API.PostDTOs;
using API.ResponseDTOs;
using API.Tools;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SerialController
    (
        IGenericRepository<Serial> repository,
        IMapper mapper,
        IGenericRepository<Card> cardRepository,
        IGenericRepository<Game> gameRepository,
        IGameCardsRepository gameCardsRepository
        ): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IList<SerialResponseDTO>>> GetSerials()
    {
        var serials = await repository.ListAllAsync();
        return Ok(serials.Select(serial => 
            mapper.Map<SerialResponseDTO>((serial, 
                    cardRepository.ListAllAsync().Result
                        .Count(card => card.SerialId == serial.Id)
                ))
            )
        );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Serial>> GetSerial(int id)
    {
        var serial = await repository.GetByIdAsync(id);
        if (serial == null) return NotFound();
        return Ok(serial);
    }

    [HttpPost("cards")]
    public async Task<ActionResult<bool>> PostSerialCards(PostSerialCardsDTO serialDto)
    {
        var newSerial = repository.AddAsync(mapper.Map<Serial>(serialDto));
        await repository.SaveChangesAsync();
        var cardNumber = serialDto.CardNumber;
        while (cardNumber > 0)
        {
            cardRepository.AddAsync(mapper.Map<Card>(new PostCardDTO()
            {
                SerialId = newSerial.Id,
                ContentMatrix = CardTools.GenerateContentMatrix(),
                CardNumber = cardNumber
            }));
            cardNumber--;
        }
        return Ok(await cardRepository.SaveChangesAsync());
    }

    [HttpDelete("{cardId}/game/{gameId}")]
    public async Task<ActionResult<bool>> DeleteCardFromGame(int cardId, int gameId)
    {
        var gameCards = gameCardsRepository.GetGameCard(gameId, cardId);
        if (gameCards == null) return NotFound();
        gameCardsRepository.DeleteGameCardRelation(gameCards);
        return Ok(await gameCardsRepository.SaveChangesAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteSerial(int id)
    {
        
        var serial = await repository.GetByIdAsync(id);
        if (serial == null) return NotFound();
        if (gameCardsRepository.ExistsSerialInAnyGame(id)) return Conflict("no se pueden eliminar seriales yá usados");
        var cards = await cardRepository.ListAllAsync();
        foreach (Card card1 in cards.Where(card => card.SerialId == id))
        {
            cardRepository.DeleteAsync(card1);
        }
        repository.DeleteAsync(serial);
        return Ok(await repository.SaveChangesAsync());
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> UpdateSerial(int id, PutSerialDTO serialDto)
    {
        var serial = await repository.GetByIdAsync(id);
        if (serial == null) return NotFound();
        repository.UpdateAsync(mapper.Map<Serial>((serialDto, id)));
        return await repository.SaveChangesAsync();
    }

    [HttpPost("game")]
    public async Task<ActionResult<bool>> AddSerialToGame(PostGameSerialDTO gameSerialDto)
    {
        var game = await gameRepository.GetByIdAsync(gameSerialDto.GameId);
        if (game == null) return NotFound();
        var serial = await repository.GetByIdAsync(gameSerialDto.SerialId);
        if (serial == null) return NotFound();
        if (gameCardsRepository.ExistsSerialGameRelation(gameSerialDto.GameId, gameSerialDto.SerialId))
            return Conflict("yá hay un serial en esta partida");
        gameCardsRepository.CreateSerialGameRelation(gameSerialDto.GameId, gameSerialDto.SerialId);
        return Ok(await gameCardsRepository.SaveChangesAsync());
    }
}