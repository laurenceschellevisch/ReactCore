using Microsoft.EntityFrameworkCore;
using TodoReactApp.Models;


namespace TodoReactApp.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<Todo>().HasOne(s => s.User).WithMany(a => a.UserTodolist).OnDelete(DeleteBehavior.Cascade);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Todo> Todos { get; set; }

    }
}
