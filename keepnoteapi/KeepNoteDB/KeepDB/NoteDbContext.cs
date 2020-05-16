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
        public NoteDbContext():base()
        { }
        public NoteDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Remainder> Remainders { get; set; }
        public DbSet<NoteStatus> NoteStatuses { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}
