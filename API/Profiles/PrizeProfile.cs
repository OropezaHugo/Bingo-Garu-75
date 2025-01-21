using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class PrizeProfile: Profile
{
    public PrizeProfile()
    {
        CreateMap<Prize, PrizeResponseDTO>();
        CreateMap<PostPrizeDTO, Prize>();
    }
}