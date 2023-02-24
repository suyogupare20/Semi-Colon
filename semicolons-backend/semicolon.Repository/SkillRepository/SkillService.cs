using Microsoft.EntityFrameworkCore;
using semicolon.Data;
using semicolon.DB;
using semicolon.DTO;
using semicolon.Repository.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace semicolon.Repository.SkillRepository
{

    public class SkillService : ISkill
    {
        private readonly IUser _userService;
        private readonly SemicolonDbContext _semicolonDbContext;
        public SkillService(SemicolonDbContext semicolonDbContext, IUser userService)
        {
            _semicolonDbContext = semicolonDbContext;
            _userService = userService;
        }

        public async Task<IEnumerable<SkillUser>> GetBySkills(string[] skills)
        {
            List<SkillUser> UserList = (List<SkillUser>)await _userService.GetUsers();
            //List<SkillUser> result = new List<SkillUser>();

            //foreach (SkillUser p in UserList)
            //{
            //    string[] personsSkill = p.SkillName.Split(",");
            //    Array.Sort(personsSkill);
            //    Console.WriteLine(personsSkill[0]);
            //    Boolean flag = true;
            //    for (int i = 0; i < skills.Length; i++)
            //    {
            //        if (flag)
            //        {
            //            for (int j = 0; j < personsSkill.Length; j++)
            //            {
            //                if (skills[i].ToLower() == personsSkill[j].ToLower())
            //                {
            //                    result.Add(p);
            //                    flag = false;
            //                    break;
            //                }
            //            }
            //        }
            //    }
            //}
            //return result;

            
            List<SkillUser> result = new List<SkillUser>();
            foreach (SkillUser p in UserList)
            {
                String[] personsSkill = p.SkillName.Split(",");
               
                List<String> hasSkill = new List<String>();
                for (int i = 0; i < skills.Length; i++)
                {
                    for (int j = 0; j < personsSkill.Length; j++)
                    {
                        if (skills[i].ToLower() == personsSkill[j].ToLower())
                        {
                            hasSkill.Add(skills[i]);
                            break;
                        }
                    }

                }
                if (hasSkill.Count == skills.Length) {
                    result.Add(p);
                        }



            }
            return result;
        }

        public async Task<IEnumerable<Skill>> GetSkills()
        {
            var skills = await _semicolonDbContext.Skills.ToListAsync();
            return skills;
        }
    }
}
