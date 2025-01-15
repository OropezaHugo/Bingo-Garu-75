using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class GameProfile: Profile
{
    public GameProfile()
    {
        CreateMap<PostGameDTO, Game>()
            .ForMember(dest => dest.RandomPatterns, opt => opt.MapFrom(src => src.RandomPatterns))
            .ForMember(dest => dest.AutomaticRaffle, opt => opt.MapFrom(src => src.AutomaticRaffle))
            .ForMember(dest => dest.SharePrizes, opt => opt.MapFrom(src => src.SharePrizes));
        CreateMap<Game, GameResponseDTO>();
    }
}