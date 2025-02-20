using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class RoundProfile: Profile
{
    public RoundProfile()
    {
        CreateMap<Round, RoundResponseDTO>();
        CreateMap< (PutRoundDTO, int), Round>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2))
            .ForMember(dest => dest.RaffleNumbers, opt => opt.MapFrom(src => src.Item1.RaffleNumbers))
            .ForMember(dest => dest.RoundName, opt => opt.MapFrom(src => src.Item1.RoundName))
            .ForMember(dest => dest.Active, opt => opt.MapFrom(src => src.Item1.Active))
            .ForMember(dest => dest.GameId, opt => opt.MapFrom(src => src.Item1.GameId));
        
    }
}