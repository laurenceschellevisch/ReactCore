using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace TodoReactApp.Models
{
    public class Todo
    {
        [Key] public int Id { get; set; }
        public string Description { get; set; }

        public int IdUser { get; set; }
        [ForeignKey("IdUser")] public User User { get; set; }

    }
    public class TodoInsertDTO
    {
        public string Email { get; set; }
        public string TodoDesc { get; set; }
    }
    public class DeletetodoDTO
    {
        public int id { get; set; }
        public string email { get; set; }
    }
    public class TodoEditDTO
    {
        public string Email { get; set; }
        public int Id { get; set; }
        public string TodoDesc { get; set; }
    }

}
