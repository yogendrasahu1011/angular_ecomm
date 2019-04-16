using SportsEquipmentManagement.DBContext;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace SportsEquipmentManagement.Controllers
{
    public class CompanyAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(SportsDB.TblCompanies.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblCompany value)
        {
            SportsDB.TblCompanies.Add(value);
            return ToJson(SportsDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblCompany value)
        {
            SportsDB.Entry(value).State = EntityState.Modified;
            return ToJson(SportsDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            SportsDB.TblCompanies.Remove(SportsDB.TblCompanies.FirstOrDefault(x => x.CompanyId == id));
            return ToJson(SportsDB.SaveChanges());
        }
    }
}


