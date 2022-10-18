// using System.Collections;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using PostitcardService.Models;

// namespace PostitcardService.Models.Postitcard
// {
//     public class DbPostitcardRepository : IPostitcardRepository
//     {
//         private AppDbContext _appDbContext;

//         public class DbPostitcardRepository : IPostitcardRepository 
//         {
//             _appDbContext = AppDbContext;
//         }

//         public IEnumerable<Postitcard> AllPostcards => _appDbContext.Postitcard;
//     }
// }