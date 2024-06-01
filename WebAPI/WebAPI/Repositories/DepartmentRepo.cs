using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class DepartmentRepo : IDepartmentRepo
    {
        private HRDBContext dBContext;

        public DepartmentRepo(HRDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public void AddDepartment(Department department)
        {
            dBContext.Departments.Add(department);
            dBContext.SaveChanges();
        }
        public List<Department> GetAll()
        {
            return dBContext.Departments.ToList();
        }
        public Department GetByName(string name)
        {
            return dBContext.Departments.SingleOrDefault(d => d.Name == name);
        }

		public Department GetById(int id)
		{
			return dBContext.Departments.SingleOrDefault(e => e.Id == id);
		}

		public void Delete(int id)
		{
			dBContext.Departments.Remove(GetById(id));
		}
		public void Save()
		{
			dBContext.SaveChanges();
		}
	}
}
