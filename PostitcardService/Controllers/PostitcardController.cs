
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using PostitcardService.Models;
using PostitcardService.Models.Postitcard;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;


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

            return Ok(postitcard);
        }

        [HttpGet]
        public IEnumerable<Postitcard> GetPostitcards() 
        {
            var postitcard = _context.Postitcard;

            return postitcard;
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Postitcard>> DeletePostitcard(int id)
        {

            var postitcard = new Postitcard()
            {
                Id = id
            };

            _context.Postitcard.Remove(postitcard);
            await _context.SaveChangesAsync();

            return Ok(postitcard);

            // try
            // {
            //     var postitcardToDelete = await _context.Postitcard(id);

            //     if (postitcardToDelete == null)
            //     {
            //         return NotFound($"Postitcard with id {id} was not found");
            //     }

            //     _context.Postitcard.Remove(id);
            //     await _context.SaveChangesAsync();

            //     return await postitcardToDelete.DeletePostitcard(id);
            // }
            // catch (System.Exception)
            // {
                
            //     throw;
            // }
        }

    }
}