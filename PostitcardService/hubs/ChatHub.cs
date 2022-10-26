using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        
        public async Task RemoveMessage(int id)
        {
            var postitcard = new Postitcard()
            {
                Id = id
            };

            _context.Postitcard.Remove(postitcard);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("RemoveMessage", id);
        }

        public async Task PrintAllCards()
        {
            await Clients.All.SendAsync("PrintAllCards");
        }
    }
}