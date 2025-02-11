using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(SignInManager<AppUser> signInManager): ControllerBase
{
    
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }
    
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return Unauthorized();
        }

        var email = User.FindFirstValue(ClaimTypes.Email);
        if (email == null)
        {
            return BadRequest();
        }
        var user = await signInManager.UserManager.Users.FirstOrDefaultAsync(appUser => appUser.Email == email);
        if (user == null) return NoContent();
        return Ok(new
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
        });
    }

    [HttpGet("auth-status")]
    public ActionResult GetAuthState()
    {
        return Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false
        });
    }
}