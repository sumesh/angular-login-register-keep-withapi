using KeepNoteDB.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace KeepNoteDB.KeepDB
{
    public class NoteDbContext : DbContext
    {
        public NoteDbContext() : base()
        { }
        public NoteDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<EmployeeSkills>(e =>
            //{
            //    e.HasKey(l => new { l.SkillsId, l.EmployeeId });
            //});

            modelBuilder.Entity<NoteStatus>(e =>
            {
                e.HasData(new[]
                {
                new NoteStatus() { StatusId = 1, Status="Not Started" },
                new NoteStatus() { StatusId = 2, Status="In Progress" },
                new NoteStatus() { StatusId = 3, Status="Completed" }
            });
            });

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Remainder> Remainders { get; set; }
        public DbSet<NoteStatus> NoteStatuses { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}
