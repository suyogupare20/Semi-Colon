using System.ComponentModel.DataAnnotations;

namespace semicolon.Data
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public long? Phone { get; set; }
        public double? WorkEx { get; set; }
        public string? Department { get; set; }
              

    }
}