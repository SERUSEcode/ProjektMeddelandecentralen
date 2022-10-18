using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostitcardService.Models.Postitcard
{
    public class Postitcard
    {
        public int Id { get; set; }
        public string Room { get; set; }
        public string Message { get; set; }
    }
}