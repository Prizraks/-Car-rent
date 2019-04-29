using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carRent.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public DateTime Dob { get; set; }
        public string NumbDL { get; set; }
    }
}
