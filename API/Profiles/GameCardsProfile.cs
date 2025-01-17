using API.PostDTOs;
using API.ResponseDTOs;
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
        
        CreateMap<SellCardDTO, GameCards>()
            .ForMember(dest => dest.GameId, opt => opt.MapFrom(src => src.GameId))
            .ForMember(dest => dest.CardId, opt => opt.MapFrom(src => src.CardId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Sold, opt => opt.MapFrom(src => src.Sold));

        CreateMap<(Card, GameCards), GameCardResponseDTO>()
            .ForMember(dest => dest.GameId, opt => opt.MapFrom(src => src.Item2.GameId))
            .ForMember(dest => dest.CardId, opt => opt.MapFrom(src => src.Item2.CardId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Item2.UserName))
            .ForMember(dest => dest.CardNumber, opt => opt.MapFrom(src => src.Item1.CardNumber))
            .ForMember(dest => dest.Sold, opt => opt.MapFrom(src => src.Item2.Sold))
            .ForMember(dest => dest.ContentMatrix, opt => opt.MapFrom(src => src.Item1.ContentMatrix))
            .ForMember(dest => dest.SerialId, opt => opt.MapFrom(src => src.Item1.SerialId));
    }
}