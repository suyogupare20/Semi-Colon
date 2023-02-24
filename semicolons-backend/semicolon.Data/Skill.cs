using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace semicolon.Data
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }
        public string? SkillName { get; set; }
    }
}
