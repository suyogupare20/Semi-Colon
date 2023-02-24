using semicolon.Data;
using semicolon.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace semicolon.Repository.SkillRepository
{
    public interface ISkill
    {
        Task<IEnumerable<SkillUser>> GetBySkills(string[] skills);
        Task<IEnumerable<Skill>> GetSkills();
    }
}
