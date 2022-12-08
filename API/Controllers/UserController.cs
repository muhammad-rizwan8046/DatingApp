using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] //To authorize using token
    public class UserController : BaseController
    {
        private readonly DataContext _Context;

        public UserController(DataContext context)
        {
            _Context = context;
        }

        [AllowAnonymous] //To allow for without authorization
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _Context.Users.ToListAsync();
            return users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _Context.Users.FindAsync(id);
            return user;
        }

    }
}