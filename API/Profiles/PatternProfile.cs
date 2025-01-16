using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class PatternProfile: Profile
{
    public PatternProfile()
    {
        CreateMap<PostPatternDTO, Pattern>()
            .ForMember(dest => dest.PatternMatrix, opt => opt.MapFrom(src => src.PatternMatrix))
            .ForMember(dest => dest.PatternName, opt => opt.MapFrom(src => src.PatternName));
        
        CreateMap< (PostPatternDTO, int), Pattern>()
            .ForMember(dest => dest.PatternMatrix, opt => opt.MapFrom(src => src.Item1.PatternMatrix))
            .ForMember(dest => dest.PatternName, opt => opt.MapFrom(src => src.Item1.PatternName))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2));
        
        CreateMap<Pattern, PatternResponseDTO>()
            .ForMember(dest => dest.PatternMatrix, opt => opt.MapFrom(src => src.PatternMatrix))
            .ForMember(dest => dest.PatternName, opt => opt.MapFrom(src => src.PatternName))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
    }
}