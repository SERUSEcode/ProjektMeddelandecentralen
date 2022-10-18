
using Microsoft.AspNetCore.Mvc;
using PostitcardService.Models;
using PostitcardService.Models.Postitcard;



namespace PostitService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostitcardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostitcardController(AppDbContext context)
        {
            _context = context; 
        }

        [HttpPost]
        [Route("AddCard")]
        public async Task<ActionResult<List<Postitcard>>> AddPostitcard(string room, string msg)
        {

            var postitcard = new Postitcard()
            {
                Room = room,
                Message = msg
            };

            _context.Postitcard.Add(postitcard);
            await _context.SaveChangesAsync();


            

            // using (var db = new AppDbContext())
            // {
            //     db.Add(postitcard);
            //     db.SaveChanges();
            // }

            return Ok();
        }
    }
}