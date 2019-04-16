using SportsEquipmentManagement.DBContext;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace SportsEquipmentManagement.Controllers
{
    public class POAPIController : BaseAPIController
    {
        
        public HttpResponseMessage Get()
        {
            return ToJson(SportsDB.TblPOes.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblPO value)
        {
            SportsDB.TblPOes.Add(value);
            return ToJson(SportsDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblPO value)
        {
            SportsDB.Entry(value).State = EntityState.Modified;
            return ToJson(SportsDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            SportsDB.TblPOes.Remove(SportsDB.TblPOes.FirstOrDefault(x => x.Id == id));
            return ToJson(SportsDB.SaveChanges());
        }

    }
}
