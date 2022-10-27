using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PostitcardService.Models;
using PostitcardService.Models.Postitcard;
using Microsoft.AspNetCore.Mvc;


namespace PostitcardService.hubs 
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;

        public ChatHub(AppDbContext context)
        {
            _context = context; 
        }

        public async Task SendMessage(string room, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", room, message);
        }
        
        public async Task RemoveMessage(int item)
        {


            // var result = await _context.Postitcard
            // .Select((x, i) => new { item = x, index = i })
            // .FirstOrDefaultAsync();

            // _context.Postitcard.Remove(result);
            // await _context.SaveChangesAsync();
            // return result;
            var postitcard = new Postitcard()
            {
                Id = item
            };

            _context.Postitcard.Remove(postitcard);
            await _context.SaveChangesAsync();

            // await Clients.All.SendAsync("RemoveMessage", id);
        }

        public async Task PrintAllCards()
        {
            await Clients.All.SendAsync("PrintAllCards");
        }
    }
}