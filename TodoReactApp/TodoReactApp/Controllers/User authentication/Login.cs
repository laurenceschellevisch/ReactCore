using System;
using System.Security.Cryptography;

namespace TodoReactApp.Controllers.Helpers
{
    public class Login
    {
        /// <summary>
        ///     checks if the combination of password and username match
        /// </summary>
        /// <param name="dbPassword"></param>
        /// <param name="password"></param>
        /// <returns>true or false</returns>
        public bool Checkpassword(string password, string dbPassword)
        {
            //get password from database and put in this string
            string savedPasswordHash = dbPassword;

            /* Extract the bytes */
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
            /* Get the salt */
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            /* Compute the hash on the password the user entered */
            Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);
            /* Compare the results */
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }

            return true;
        }
    }
}
