using SportsEquipmentManagement.DBContext;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SportsEquipmentManagement.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly SportsDBEntities SportsDB = new SportsDBEntities();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
