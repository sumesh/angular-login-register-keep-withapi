using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using KeepNote.Helpers;
using KeepNoteDB.Model;
using KeepNoteDB.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace KeepNote.Controllers
{
    [ApiController] 
    //[Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        IAuthRepository authRepository;

        public AuthController(IOptions<AppSettings> appSettings,IAuthRepository authRepo)
        {
            _appSettings = appSettings.Value;
            this.authRepository = authRepo;
        }

        [Authorize]
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            var retusr = authRepository.GetUser(Convert.ToInt32(User.Identity.Name));

            if (retusr == null)
                return BadRequest(new { message = "Invalid User" });

            UserDTO user = new UserDTO
            {
                UserId = retusr.UserId,
                Name = retusr.Name,
                EmailId = retusr.EmailId
            };

            return Ok(user);
        }

        [Authorize]
        [HttpPost("updateuser")]
        public IActionResult UpdateUser([FromBody] User model)
        {
            model.UserId = Convert.ToInt32(User.Identity.Name);
            var user = authRepository.UpdateUser(model);

            if (!user)
                return BadRequest(new { message = "Invalid User" });

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public   IActionResult  Login([FromBody] User model)
        {
            var user =   Authenticate(model); 
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public IActionResult Register([FromBody] User model)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, authRepository.CreateUser(model));
            }
            catch (Exception)
            {

                return BadRequest(new { message = "User already exists.Please try again" });
            }
        }

        

        private UserDTO Authenticate(User u)
        {
            var retusr = authRepository.LoginUser(u) ; 

            // return null if user not found
            if (retusr == null)
                return null;

            UserDTO user = new UserDTO
            {
                UserId = retusr.UserId,
                Name=retusr.Name,
                EmailId=retusr.EmailId
            };

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
    }
}
