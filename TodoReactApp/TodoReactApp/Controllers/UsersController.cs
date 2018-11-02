using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoReactApp.Models;
using TodoReactApp.Controllers.Helpers;

namespace TodoReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TodoContext _context;

        public UsersController(TodoContext context)
        {
            _context = context;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> AuthenticateUser([FromBody] UserAuthTokenDto User)
        {
            Authenticator Auth = new Authenticator();
            if (!Auth.AuthenticateUser(User.Token, _context))
                return StatusCode(401);

            return Ok();
        }
        
        [HttpPost("refreshAccessToken")]
        public async Task<IActionResult> RefreshAccessToken([FromBody] refreshAccessTokenDto refreshTokenDto)
        {
            User loggedinUser = (_context.Users.First(e => e.RefreshToken == refreshTokenDto.RefreshToken));
            if (loggedinUser.TokenDate < DateTime.Now.AddHours(1) && loggedinUser.RefreshToken == refreshTokenDto.RefreshToken)
            {
                Authenticator auth = new Authenticator();
                loggedinUser.RefreshToken = auth.GenerateLogintoken();
                loggedinUser.Token = auth.GenerateLogintoken();
                loggedinUser.TokenDate = DateTime.Now;
                _context.SaveChanges();
                return Ok(new { refreshtoken = loggedinUser.RefreshToken, token = loggedinUser.Token, expiredate = ((DateTime)loggedinUser.TokenDate).AddHours(1)});
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserInsertDto user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!user.Email.Contains("@"))
                return StatusCode(409, "E-mail is invalid");

            if (!user.Email.Contains("."))
                return StatusCode(409, "E-mail is invalid");

            if (_context.Users.Any(e => e.Email == user.Email))
                return StatusCode(409, "E-mail is already registered");



            Register RegisterHandler = new Register();
            try
            {
                return Ok(RegisterHandler.RegisterUser(new UserInsertDto()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Pass = user.Pass,
                }, _context));
            }
            catch (Exception e)
            {

                throw;
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto User)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!User.Email.Contains("@"))
                return StatusCode(406, "Login E-mail is invalid");

            if (!User.Email.Contains("."))
                return StatusCode(406, "Login E-mail is invalid");

            if (!_context.Users.Any(e => e.Email == User.Email))
                return StatusCode(406, "You arent registered in the system");

            Login loginHandler = new Login();

            if (!loginHandler.Checkpassword(User.Password, (_context.Users.First(x => x.Email == User.Email)).Password))
                return StatusCode(406, "Password is not correct");

            Authenticator Auth = new Authenticator();
            User logedinUser = (_context.Users.First(x => x.Email == User.Email));

            logedinUser.Token = Auth.GenerateLogintoken();
            logedinUser.RefreshToken = Auth.GenerateLogintoken();
            logedinUser.TokenDate = DateTime.Now;
            _context.SaveChanges();
            return Ok(new
            {
                email = logedinUser.Email,
                token = logedinUser.Token,
                refreshtoken = logedinUser.RefreshToken,
                expiredate = ((DateTime)logedinUser.TokenDate).AddHours(1)
            });
        }

    }
}