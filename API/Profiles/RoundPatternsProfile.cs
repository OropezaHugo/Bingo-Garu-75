using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class RoundPatternsProfile: Profile
{
    public RoundPatternsProfile()
    {
        CreateMap<PostRoundPatternDTO, RoundPatterns>()
            .ForMember(dest => dest.RoundId, opt => opt.MapFrom(src => src.RoundId))
            .ForMember(dest => dest.PatternId, opt => opt.MapFrom(src => src.PatternId))
            .ForMember(dest => dest.TargetPrice, opt => opt.MapFrom(src => src.TargetPrice))
            .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Active));

        CreateMap<(RoundPatterns, Pattern), PatternInfoResponseDTO>()
            .ForMember(dest => dest.TargetPrice, opt => opt.MapFrom(src => src.Item1.TargetPrice))
            .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Item1.Active))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2.Id))
            .ForMember(dest => dest.PatternName, opt => opt.MapFrom(src => src.Item2.PatternName))
            .ForMember(dest => dest.PatternMatrix, opt => opt.MapFrom(src => src.Item2.PatternMatrix));

    }
}