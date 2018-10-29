using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TodoReactApp.Models
{
    public class User
    {
        [Key] public int Id { get; set; }

        [Required] [MaxLength(256)] public string FirstName { get; set; }

        [Required] [MaxLength(256)] public string LastName { get; set; }

        [Required] [MaxLength(256)] public string Email { get; set; }

        [Required] public string Password { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public DateTime? TokenDate { get; set; }

        public DateTime? CreatedOn { get; set; }

        public DateTime? LastAction { get; set; }

        public bool IsActivated { get; set; }
        public List<Todo> UserTodolist { get; set; } = new List<Todo>();

    }

    public class UserInsertDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
    }

    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserAuthTokenDto
    {
        public string Token { get; set; }
    }
    public class refreshAccessTokenDto
    {
        public string RefreshToken { get; set; }
    }
}
