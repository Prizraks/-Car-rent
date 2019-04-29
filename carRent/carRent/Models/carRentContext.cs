using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace carRent.Models
{
    public class carRentContext: DbContext
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public carRentContext(DbContextOptions<carRentContext> options)
            : base(options)
        {
        }
    }
}
