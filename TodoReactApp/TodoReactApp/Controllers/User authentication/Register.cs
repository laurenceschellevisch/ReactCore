using System;
using System.Linq;
using System.Security.Cryptography;
using TodoReactApp.Models;

namespace TodoReactApp.Controllers.Helpers
{

    public class Register
    {
        /// <summary>
        /// Hashes the given password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public string HashPassword(string password)
        {
            // Creating the salt value with a cryptographic PRNG
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Creating the Rfc2898DeriveBytes and get the hash value
            Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            //Combining the salt and password bytes for later use:
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            //Turning the combined salt+hash into a string for storage
            string savedPasswordHash = Convert.ToBase64String(hashBytes);

            //returning hashedpassword
            return savedPasswordHash;
        }
        public Random random = new Random();
        public string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        /// <summary>
        /// registers user after all checks are done and hashed the password
        /// </summary>
        /// <param name="users"></param>
        /// <param name="_context"></param>
        /// <returns></returns>
        public string RegisterUser(UserInsertDto users, TodoContext _context)
        {
            
            _context.Users.Add(new User()
            {
                FirstName = users.FirstName,
                LastName = users.LastName,
                Password = HashPassword(users.Pass),
                Email = users.Email,
                CreatedOn = DateTime.Now,
                IsActivated = true,
            });
          
            _context.SaveChanges();
            return ("Registration success");
        }
    }
}
