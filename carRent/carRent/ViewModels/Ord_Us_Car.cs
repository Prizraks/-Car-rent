using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carRent.ViewModels
{
    public class Ord_Us_Car
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public int userId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string dateStart { get; set; }
        public string dateEnd { get; set; }
        public string numb { get; set; }
        public string comment { get; set; }
    }
}
