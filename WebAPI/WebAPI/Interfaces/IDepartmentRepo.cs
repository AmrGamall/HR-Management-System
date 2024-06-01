using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDepartmentRepo
    {
        public List<Department> GetAll();
        public Department GetByName(string name);

        public void AddDepartment(Department department);
		public Department GetById(int id);

		public void Delete(int id);

		public void Save();

	}
}
