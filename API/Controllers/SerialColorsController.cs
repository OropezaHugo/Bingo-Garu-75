using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SerialColorsController : ControllerBase
{
    private readonly IGenericRepository<Serial> _repository;
    private readonly IMapper _mapper;

    public SerialColorsController(IGenericRepository<Serial> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<SerialColorsDTO>> GetColors(int id)
    {
        var serial = await _repository.GetByIdAsync(id);
        if (serial == null)
        {
            return NotFound();
        }

        var serialColors = new SerialColorsDTO
        {
            StrokeColor = serial.StrokeColor,
            BoxFillColor = serial.BoxFillColor,
            CardFillColor = serial.CardFillColor,
            CardNameColor = serial.CardNameColor,
            BoxNumberColor = serial.BoxNumberColor,
            CardNumberColor = serial.CardNumberColor
        };

        return Ok(serialColors);
    }
}