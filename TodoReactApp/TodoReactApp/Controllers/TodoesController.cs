using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoReactApp.Models;

namespace TodoReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoesController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoesController(TodoContext context)
        {
            _context = context;
        }


        [HttpGet("Gettodos/{email}")]
        public async Task<IActionResult> Gettodos([FromRoute] string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (string.IsNullOrEmpty(email))
                return BadRequest("email empty");

            User loggedinuser = (_context.Users.FirstOrDefault(x => x.Email == email));
            var todosList = (_context.Todos.Where(x => x.IdUser == loggedinuser.Id)).Select(x => new {x.Description,x.Id}).ToList();
            return Ok(todosList);

        }

        [HttpPost("Edittodo")]
        public async Task<IActionResult> EditTodo([FromBody] TodoEditDTO info)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (string.IsNullOrEmpty(info.ToString()))
                return BadRequest("Id invalid");

            Todo todosList = (_context.Todos.FirstOrDefault(x => x.Id == info.Id));
            todosList.IdUser = _context.Users.FirstOrDefault(x => x.Email == info.Email).Id;
            todosList.Id = info.Id;
            todosList.Description = info.TodoDesc;
            _context.SaveChanges();
            return Ok("sucess");

        }
        [HttpPost("Deletetodo")]
        public async Task<IActionResult> Deletetodo([FromBody] DeletetodoDTO info)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (string.IsNullOrEmpty(info.ToString()))
                return BadRequest("Id invalid");
            if (!String.IsNullOrEmpty(_context.Users.First(x => x.Email == info.email).ToString()))
            {
                _context.Todos.Remove(_context.Todos.FirstOrDefault(x => x.Id == info.id));
                _context.SaveChanges();
                return Ok("sucess");

            }

            return BadRequest("wrong data");

        }

        [HttpPost("addtodo")]
        public async Task<IActionResult> AddTodo([FromBody] TodoInsertDTO info)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (string.IsNullOrEmpty(info.ToString()))
                return BadRequest("Id invalid");

            _context.Todos.Add(new Todo()
            {
                IdUser = _context.Users.FirstOrDefault(x => x.Email == info.Email).Id,
                Description = info.TodoDesc
                
            });
            _context.SaveChanges();
            return Ok("Sucess");

        }

        [HttpGet("gettodo/{id}")]
        public async Task<IActionResult> Getsingletodo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (string.IsNullOrEmpty(id.ToString()))
                return BadRequest("InvalidId");

            var todosList = (_context.Todos.Where(x => x.Id == id).Select(x => new { x.Description,x.Id}));

            return Ok(todosList);

        }
    }
}