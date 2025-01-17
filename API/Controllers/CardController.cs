using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class CardController(
    IGenericRepository<Card> repository,
    IGenericRepository<Game> gameRepository,
    IGameCardsRepository gameCardsRepository,
    IMapper mapper): ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<IList<CardResponseDTO>>> GetCardById(int id)
    {
           var card = await repository.GetByIdAsync(id);
           if (card == null) return NotFound();
           return Ok(card);
    }

    [HttpGet("serial/{id}")]
    public async Task<ActionResult<IList<CardResponseDTO>>> GetCardBySerial(int id)
    {
        var cards = await repository.ListAllAsync();
        var filteredCards = cards.Where(card => card.SerialId == id);
        return Ok(filteredCards.Select(card => mapper.Map<CardResponseDTO>(card)));
    }
    
    [HttpGet("game/{id}")]
    public async Task<ActionResult<IList<GameCardResponseDTO>>> GetCardsByGameId(int id)
    {
        var cards = await repository.ListAllAsync();
        var gameCardsResponse = cards.Join(gameCardsRepository.ListAllGameCards().Result,
            card => card.Id,
            gameCards => gameCards.CardId, (card, gameCards) => mapper.Map<GameCardResponseDTO>((card, gameCards)))
            .Where(dto => dto.GameId == id).ToList();
        return Ok(gameCardsResponse);
    }

    [HttpPost("game")]
    public async Task<ActionResult<bool>> UpdateGameCard(SellCardDTO sellCardDto)
    {
        if (await repository.GetByIdAsync(sellCardDto.CardId) == null) return NotFound();
        if (await gameRepository.GetByIdAsync(sellCardDto.GameId) == null) return NotFound();
        if(!gameCardsRepository.ExistsGameCardRelation(sellCardDto.GameId, sellCardDto.CardId)) return NotFound();
        gameCardsRepository.SellGameCards(mapper.Map<GameCards>(sellCardDto));
        return Ok(await gameCardsRepository.SaveChangesAsync());
    }
}