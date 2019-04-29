using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using carRent.Models;

namespace carRent.Controllers
{
    [Produces("application/json")]
    public class CarController : Controller
    {
        private readonly carRentContext db;
        public CarController(carRentContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("api/cars/get")]
        public IActionResult GetCars()
        {
            List<Car> _cars = new List<Car>();
            /*var CarsData = (from data in db.Cars
                                   select new
                                   {
                                       data.Id,
                                       data.Brand,
                                       data.Model,
                                       data.Klas,
                                       data.year,
                                       data.numb
                                   }).ToList();*/
            var CarsData = db.Cars.ToList();
            CarsData.ForEach(x =>
            {
                Car pro = new Car();
                pro.Id = x.Id;
                pro.Brand = x.Brand;
                pro.Model = x.Model;
                pro.Klas = x.Klas;
                pro.year = x.year;
                pro.numb = x.numb;
                _cars.Add(pro);
            });
            return Json(_cars);
        }
        [HttpPost]
        [Route("api/cars/create")]
        public IActionResult AddCar([FromBody] Car UsObj)
        {
            db.Cars.Add(UsObj);
            db.SaveChanges();
            return Json("Ok");
        }
    }
}