using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using carRent.Models;
using carRent.ViewModels;

namespace carRent.Controllers
{
    [Produces("application/json")]
    public class OrderController : Controller
    {
        private readonly carRentContext db;
        public OrderController(carRentContext context)
        {
            db = context;
        }
        [HttpGet]
        [Route("api/order/get")]
        public IActionResult GetOrders()
        {
            List<Ord_Us_Car> _data = new List<Ord_Us_Car>();
            var listData = (from ord in db.Orders
                            join us in db.Users on ord.userId equals us.Id
                            join car in db.Cars on ord.CarId equals car.Id
                            select new
                            {
                                ord.Id,
                                ord.CarId,
                                ord.userId,
                                us.FirstName,
                                us.LastName,
                                car.Brand,
                                car.Model,
                                ord.DateStart,
                                ord.DateEnd,
                                car.numb,
                                ord.comment
                            }
                         ).ToList();
            listData.ForEach(x =>
            {
                Ord_Us_Car Obj = new Ord_Us_Car();
                Obj.Id = x.Id;
                Obj.CarId = x.CarId;
                Obj.userId = x.userId;
                Obj.FirstName = x.FirstName;
                Obj.LastName = x.LastName;
                Obj.Brand = x.Brand;
                Obj.Model = x.Model;
                Obj.dateStart = x.DateStart.ToString("yyyy.MM.dd");
                Obj.dateEnd = x.DateEnd.ToString("yyyy.MM.dd");
                Obj.numb = x.numb;
                Obj.comment = x.comment;
                _data.Add(Obj);
            });
            return Json(_data);
        }

        [HttpPost]
        [Route("api/orders/create")]
        public IActionResult AddUser([FromBody] Order UsObj)
        {
            db.Orders.Add(UsObj);
            db.SaveChanges();
            return Json("Ok");
        }

        [HttpDelete]
        [Route("api/orders/delete")]
        public IActionResult DeleteOrder([FromBody]int id)
        {
            Order b = db.Orders.Find(id);
            db.Orders.Remove(b);
            db.SaveChanges();
            return Json("Ok");
        }
        [HttpPut]
        [Route("api/orders/update")]
        public IActionResult UpdateOrder([FromBody] Order UptObj)
        {
            var entity = db.Orders.FirstOrDefault(item => item.Id == UptObj.Id);
            entity.CarId = UptObj.CarId;
            entity.userId = UptObj.userId;
            entity.DateStart = UptObj.DateStart;
            entity.DateEnd = UptObj.DateEnd;
            entity.comment = UptObj.comment;
            db.Orders.Update(entity);
            db.SaveChanges();
            return Json("Ok");
        }
    }
}