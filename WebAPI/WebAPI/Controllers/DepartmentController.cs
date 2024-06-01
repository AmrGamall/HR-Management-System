using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentRepo departmentRepo;
        private IMapper mapper;

        public DepartmentController(IDepartmentRepo departmentRepo, IMapper mapper)
        {
            this.departmentRepo = departmentRepo;
            this.mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddDepartment(DepartmentDTO departmentDTO)
        {
             var newDept = mapper.Map<Department>(departmentDTO); ;
            departmentRepo.AddDepartment(newDept);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Department> departments = departmentRepo.GetAll();
            if (departments.Count == 0)
            {
                return NoContent();
            }

            List<DepartmentDTO> departmentDTOs = new List<DepartmentDTO>();

            foreach (var dept in departments)
            {
                DepartmentDTO deptDTO = mapper.Map<DepartmentDTO>(dept);

                departmentDTOs.Add(deptDTO);
            }

            return Ok(departmentDTOs);
        }
        [HttpGet("{name}")]
        public IActionResult GetByName(string name)
        {
            Department department = departmentRepo.GetByName(name);
            if (department == null)
            {
                return NotFound();
            }

            DepartmentDTO departmentDTO = mapper.Map<DepartmentDTO>(department);

            return Ok(departmentDTO);
        }

		#region delete
		[Authorize(Permissions.Departments.delete)]
		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Department department = departmentRepo.GetById(id);
			if (department == null)
			{
				return NotFound();
			}
			departmentRepo.Delete(id);
			departmentRepo.Save();

			return NoContent();
		}
		#endregion
	}
}
