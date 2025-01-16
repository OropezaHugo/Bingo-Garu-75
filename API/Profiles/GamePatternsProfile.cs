using API.PostDTOs;
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
        
    }
}