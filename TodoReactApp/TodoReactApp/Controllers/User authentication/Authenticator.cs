using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TodoReactApp.Models;

namespace TodoReactApp.Controllers.Helpers
{
    public class Authenticator
    {
        /// <summary>
        ///     authenticates user with a token that is connected with the login email
        /// </summary>
        /// <param name="Email"></param>
        /// <param name="Token"></param>
        /// <param name="_context"></param>
        /// <returns></returns>
        public bool AuthenticateUser( string Token, TodoContext _context)
        {
            if ((_context.Users.First(e => e.Token == Token)).Token != Token)
            {
                return false;
            }

            return true;
        }
        public string GenerateLogintoken()
        {
            const string AllowableCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&";
            var bytes = new byte[64];
            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(bytes);
            }
            return new string(bytes.Select(x => AllowableCharacters[x % AllowableCharacters.Length]).ToArray());
        }

 
    }
}
