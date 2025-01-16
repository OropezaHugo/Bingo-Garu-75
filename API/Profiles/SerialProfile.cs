using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class SerialProfile: Profile
{
    public SerialProfile()
    {
        CreateMap<PostSerialCardsDTO, Serial>()
            .ForMember(dest => dest.SerialName, opt => opt.MapFrom(src => src.SerialName));
        
        CreateMap< (PostSerialCardsDTO, int), Serial>()
            .ForMember(dest => dest.SerialName, opt => opt.MapFrom(src => src.Item1.SerialName))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2));
        
        CreateMap< (PutSerialDTO, int), Serial>()
            .ForMember(dest => dest.SerialName, opt => opt.MapFrom(src => src.Item1.SerialName))
            .ForMember(dest => dest.StrokeColor, opt => opt.MapFrom(src => src.Item1.StrokeColor))
            .ForMember(dest => dest.CardFillColor, opt => opt.MapFrom(src => src.Item1.CardFillColor))
            .ForMember(dest => dest.BoxFillColor, opt => opt.MapFrom(src => src.Item1.BoxFillColor))
            .ForMember(dest => dest.BoxNumberColor, opt => opt.MapFrom(src => src.Item1.BoxNumberColor))
            .ForMember(dest => dest.CardNameColor, opt => opt.MapFrom(src => src.Item1.CardNameColor))
            .ForMember(dest => dest.CardNumberColor, opt => opt.MapFrom(src => src.Item1.CardNumberColor))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item2));
        CreateMap< (Serial, int), SerialResponseDTO>()
            .ForMember(dest => dest.SerialName, opt => opt.MapFrom(src => src.Item1.SerialName))
            .ForMember(dest => dest.StrokeColor, opt => opt.MapFrom(src => src.Item1.StrokeColor))
            .ForMember(dest => dest.CardFillColor, opt => opt.MapFrom(src => src.Item1.CardFillColor))
            .ForMember(dest => dest.BoxFillColor, opt => opt.MapFrom(src => src.Item1.BoxFillColor))
            .ForMember(dest => dest.BoxNumberColor, opt => opt.MapFrom(src => src.Item1.BoxNumberColor))
            .ForMember(dest => dest.CardNameColor, opt => opt.MapFrom(src => src.Item1.CardNameColor))
            .ForMember(dest => dest.CardNumberColor, opt => opt.MapFrom(src => src.Item1.CardNumberColor))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Item1.Id))
            .ForMember(dest => dest.CardQuantity, opt => opt.MapFrom(src => src.Item2));
    }
}