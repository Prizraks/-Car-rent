using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carRent.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public int userId { get; set; }
        public User user { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string comment { get; set; }
    }
}
