using Microsoft.EntityFrameworkCore;
using semicolon.Data;

namespace semicolon.DB
{
    public class SemicolonDbContext : DbContext
    {
        public SemicolonDbContext(DbContextOptions<SemicolonDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<EmployeeSkill> EmployeeSkills { get; set; }
    }
}