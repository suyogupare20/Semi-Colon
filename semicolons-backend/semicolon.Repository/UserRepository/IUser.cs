using semicolon.Data;
using semicolon.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace semicolon.Repository.UserRepository
{
    public interface IUser
    {
        Task<IEnumerable<SkillUser>> GetUsers();
    }
}
