using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostitcardService.Models.Postitcard
{
    public interface IPostitcardRepository
    {
        public IEnumerable<Postitcard> AllPostitcards { get; }
    }
}