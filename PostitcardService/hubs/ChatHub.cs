using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


// namespace PostitService.hubs 
// {
//     public class ChatHub : Hub
//     {
//         public async Task TakeMessadge(Postitcard postitCard)
//         {
//             await Clients.All.SendAsync("ReciveMessage", "Hey everyone", $"{postitCard.Msg} in {postitCard.Room}");
//         }
//     }
// }

namespace PostitcardService.hubs 
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string room, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", room, message);
        }
    }
}