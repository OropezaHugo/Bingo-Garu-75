using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;

namespace API.Profiles;

public class CardProfile: Profile
{
    public CardProfile()
    {
        CreateMap<Card, CardResponseDTO>();
        CreateMap<PostCardDTO, Card>();
    }
}