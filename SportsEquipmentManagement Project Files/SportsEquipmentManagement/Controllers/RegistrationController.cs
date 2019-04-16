using System.Linq;
using System.Net.Http;
using System.Web.Http;
using SportsEquipmentManagement.DBContext;
using System.Data.Entity;

namespace SportsEquipmentManagement.Controllers
{
    public class RegistrationController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(SportsDB.TblUsers.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblUser value)
        {
            SportsDB.TblUsers.Add(value);
            return ToJson(SportsDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblUser value)
        {
            SportsDB.Entry(value).State = EntityState.Modified;
            return ToJson(SportsDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            SportsDB.TblUsers.Remove(SportsDB.TblUsers.FirstOrDefault(x => x.Id == id));
            return ToJson(SportsDB.SaveChanges());
        }
    }
}
