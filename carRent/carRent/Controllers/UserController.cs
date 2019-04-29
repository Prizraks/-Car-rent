using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using carRent.Models;
using carRent.ViewModels;

namespace carRent.Controllers
{
    [Produces("application/json")]
    public class UserController : Controller
    {
        private readonly carRentContext db;
        public UserController(carRentContext context)
        {
            db = context;
        }
        
        [HttpGet]
        [Route("api/users/get")]
        public IActionResult GetUsers()
        {
            List<User_View> _users = new List<User_View>();
            /*var UsersData = await (from data in db.Users select new {
                                    data.Id,
                                    data.FirstName,
                                    data.LastName,
                                    data.Dob,
                                    data.NumbDL
                                }).ToListAsync();*/
            var UsersData = db.Users.ToList();
            UsersData.ForEach(x =>
            {
                User_View pro = new User_View();
                pro.Id = x.Id;
                pro.FirstName = x.FirstName;
                pro.LastName = x.LastName;
                pro.Dob = x.Dob.ToString("yyyy.MM.dd");
                pro.NumbDL = x.NumbDL;
                _users.Add(pro);
            });
            return Json(_users);
        }

        [HttpPost]
        [Route ("api/users/create")]
        public IActionResult AddUser([FromBody] User UsObj)
        {
            db.Users.Add(UsObj);
            db.SaveChanges();
            return Json("Ok");
        }
    }
}
