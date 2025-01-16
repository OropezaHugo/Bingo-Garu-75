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
    public async Task<ActionResult<IList<CardResponseDTO>>> GetCardByGame(int id)
    {
        var cards = await gameCardsRepository.ListCardsByGameId(id);
        return Ok(cards.Select(card => mapper.Map<CardResponseDTO>(card)));
    }
}