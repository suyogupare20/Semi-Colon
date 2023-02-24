using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using semicolon.Repository.SkillRepository;
using semicolon.Repository.UserRepository;

namespace semicolons_backend.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _userService;
        private readonly ISkill _skillService;

        public UserController(IUser userService, ISkill skillService)
        {
            _userService = userService;
            _skillService = skillService;
        }

        [HttpGet]
        [Route("users")]
        public async Task<IActionResult> GetUsers()
        {
            var user = await _userService.GetUsers();
            return Ok(user);
        }

        [HttpGet]
        [Route("skills")]
        public async Task<IActionResult> GetBySkills(string skill)
        {
            if (string.IsNullOrEmpty(skill.Trim()))
            {
                return NotFound();
            }
            String[] skillList = skill.Split(',');
            Array.Sort(skillList);
            var user = await _skillService.GetBySkills(skillList);
            return Ok(user);
        }

        [HttpGet]
        [Route("allskills")]
        public async Task<IActionResult> GetSkills()
        {
            var skills = await _skillService.GetSkills();
            return Ok(skills);
        }
    }
}
