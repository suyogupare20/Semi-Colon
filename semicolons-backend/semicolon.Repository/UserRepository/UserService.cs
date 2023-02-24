using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using semicolon.Data;
using semicolon.DB;
using semicolon.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace semicolon.Repository.UserRepository
{
    public class UserService : IUser
    {
        private readonly SemicolonDbContext _semicolonDbContext;

        public UserService(SemicolonDbContext semicolonDbContext)
        {
            _semicolonDbContext = semicolonDbContext;
        }
        public async Task<IEnumerable<SkillUser>> GetUsers()
        {
            SqlConnection conn = new SqlConnection(_semicolonDbContext.Database.GetConnectionString().ToString());
            List<SkillUser> skillUser = new List<SkillUser>(); 
            var user = await _semicolonDbContext.Employees.ToListAsync();
            foreach (Employee emp in user)
            {
                SkillUser su = new SkillUser();
                su.FirstName = emp.FirstName;
                su.LastName= emp.LastName;
                su.Id = emp.Id;
                su.Phone = emp.Phone;
                su.Department = emp.Department;
                su.WorkEx = emp.WorkEx;
                su.Gender= emp.Gender;

                //Adding Skills

                SqlDataAdapter cmd = new SqlDataAdapter("usp_GetSkill", conn);
                cmd.SelectCommand.CommandType = CommandType.StoredProcedure;
                cmd.SelectCommand.Parameters.AddWithValue("@EmpId", emp.Id);
                DataTable dt = new DataTable();
                cmd.Fill(dt);
                string str = "";
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if (i == 0)
                        {
                            str += dt.Rows[i]["SkillName"].ToString();
                        }
                        else
                        {
                            str += "," + dt.Rows[i]["SkillName"].ToString();
                        }
                    }
                }
                su.SkillName = str;
                skillUser.Add(su);
            }
            return skillUser;
        }
    }
}
