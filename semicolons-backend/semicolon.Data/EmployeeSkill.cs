using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace semicolon.Data
{
    public class EmployeeSkill
    {
        [Key]
        public int Id { get; set; }

        // Foreign key   
        [Display(Name = "User")]
        public virtual int EmpId { get; set; }

        [ForeignKey("EmpId")]
        public virtual Employee User { get; set; }

        [Display(Name = "Skill")]
        public virtual int SkillId { get; set; }

        [ForeignKey("SkillId")]
        public virtual Skill Skill { get; set; }



    }
}
