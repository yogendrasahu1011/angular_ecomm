using SportsEquipmentManagement.DBContext;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;


namespace SportsEquipmentManagement.Controllers
{
    public class ProductAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(SportsDB.TblProducts.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblProduct value)
        {
            SportsDB.TblProducts.Add(value);
            return ToJson(SportsDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblProduct value)
        {
            SportsDB.Entry(value).State = EntityState.Modified;
            return ToJson(SportsDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            SportsDB.TblProducts.Remove(SportsDB.TblProducts.FirstOrDefault(x => x.Id == id));
            return ToJson(SportsDB.SaveChanges());
        }

    }
}
