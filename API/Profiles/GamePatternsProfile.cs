using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class GamePatternsProfile: Profile
{
    public GamePatternsProfile()
    {
        CreateMap<PostGamePatternsDTO, GamePatterns>()
            .ForMember(dest => dest.GameId, opt => opt.MapFrom(src => src.GameId))
            .ForMember(dest => dest.PatternId, opt => opt.MapFrom(src => src.PatternId))
            .ForMember(dest => dest.TargetPrice, opt => opt.MapFrom(src => src.TargetPrice))
            .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));

        CreateMap<(GamePatterns, Pattern), PatternInfoResponseDTO>()
            .ForMember(dest => dest.TargetPrice, opt => opt.MapFrom(src => src.Item1.TargetPrice))
            .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Item1.Active))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2.Id))
            .ForMember(dest => dest.PatternName, opt => opt.MapFrom(src => src.Item2.PatternName))
            .ForMember(dest => dest.PatternMatrix, opt => opt.MapFrom(src => src.Item2.PatternMatrix));

    }
}