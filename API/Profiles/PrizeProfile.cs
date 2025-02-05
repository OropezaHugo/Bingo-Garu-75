using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class PrizeProfile: Profile
{
    public PrizeProfile()
    {
        CreateMap< (Prize, Card), PrizeResponseDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item1.Id))
            .ForMember(dest => dest.CardId, opt => opt.MapFrom(src => src.Item1.CardId))
            .ForMember(dest => dest.RoundId, opt => opt.MapFrom(src => src.Item1.RoundId))
            .ForMember(dest => dest.PatternId, opt => opt.MapFrom(src => src.Item1.PatternId))
            .ForMember(dest => dest.PrizeAmount, opt => opt.MapFrom(src => src.Item1.PrizeAmount))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Item1.UserName))
            .ForMember(dest => dest.CardNumber, opt => opt.MapFrom(src => src.Item2.CardNumber))
            .ForMember(dest => dest.CardContentMatrix, opt => opt.MapFrom(src => src.Item2.ContentMatrix));
        CreateMap<PostPrizeDTO, Prize>();
    }
}