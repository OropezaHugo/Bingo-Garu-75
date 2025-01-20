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
            .ForMember(dest => dest.SharePrizes, opt => opt.MapFrom(src => src.SharePrizes))
            .ForMember(dest => dest.InProgress, opt => opt.MapFrom(src => src.InProgress))
            .ForMember(dest => dest.Finished, opt => opt.MapFrom(src => src.Finished));
        CreateMap<Game, GameResponseDTO>();
        CreateMap< (PostGameDTO, int), Game>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2))
            .ForMember(dest => dest.AutomaticRaffle, opt => opt.MapFrom(src => src.Item1.AutomaticRaffle))
            .ForMember(dest => dest.RandomPatterns, opt => opt.MapFrom(src => src.Item1.RandomPatterns))
            .ForMember(dest => dest.SharePrizes, opt => opt.MapFrom(src => src.Item1.SharePrizes))
            .ForMember(dest => dest.InProgress, opt => opt.MapFrom(src => src.Item1.InProgress))
            .ForMember(dest => dest.Finished, opt => opt.MapFrom(src => src.Item1.Finished));
    }
}