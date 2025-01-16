using API.PostDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class GameCardsProfile: Profile
{
    public GameCardsProfile()
    {
        CreateMap<PostGameCardsDTO, GameCards>()
            .ForMember(dest => dest.GameId, opt => opt.MapFrom(src => src.GameId))
            .ForMember(dest => dest.CardId, opt => opt.MapFrom(src => src.CardId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Sold, opt => opt.MapFrom(src => src.Sold));
    }
}