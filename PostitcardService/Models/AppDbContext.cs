using System.Threading;
using System;
using System.Net.Mime;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PostitcardService.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Postitcard.Postitcard> Postitcard => Set<Postitcard.Postitcard>();
        // public DbSet<Postitcard.Postitcard> Postitcard { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlite(@"Data Sorce=mydb.db");
        // }
    }
}