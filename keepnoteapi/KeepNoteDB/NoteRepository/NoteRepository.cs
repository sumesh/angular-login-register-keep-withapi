using KeepNoteDB.KeepDB;
using KeepNoteDB.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeepNoteDB.NoteRepository
{
    public class NoteRepository : INoteRepository
    {
        readonly NoteDbContext noteDb;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public NoteRepository(NoteDbContext dbContext)
        {
            this.noteDb = dbContext;
        }

        public NoteRepository()
        { }

        public async Task<Category> GetCategory(int categoryid)
        {
            return await noteDb.Categories.Where(f => f.CategoryId == categoryid).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories(int userid)
        {
            return await noteDb.Categories.Where(f => f.UserID == userid).ToListAsync();
        }

        public async Task<Category> DeleteCategory(int id)
        {
            var category = await noteDb.Categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }

            noteDb.Categories.Remove(category);
            await noteDb.SaveChangesAsync();

            return category;
        }

        public async Task<bool> CreateCategory(Category category)
        {
            category.UpdatedOn = DateTime.Now;
            noteDb.Add(category);
            int ret = await noteDb.SaveChangesAsync();
            return ret > 0 ? true : false;
        }

        public async Task<Category> UpdateCategory(Category category)
        {
            var retcategory = await noteDb.Categories.FindAsync(category.CategoryId);
            if (retcategory == null)
            {
                return null;
            }

            retcategory.Name = category.Name;
            retcategory.Description = category.Description;
            retcategory.UpdatedOn = DateTime.Now;
            await noteDb.SaveChangesAsync();

            return category;
        }

        /// <summary>
        /// /////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="remid"></param>
        /// <returns></returns>
        public async Task<Remainder> GetRemainder(int remid)
        {
            return await noteDb.Remainders.Where(f => f.RemainderId == remid).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Remainder>> GetRemainders(int userid)
        {
            return await noteDb.Remainders.Where(f => f.UserID == userid).ToListAsync();
        }

        public async Task<Remainder> DeleteRemainder(int id)
        {
            var rem = await noteDb.Remainders.FindAsync(id);
            if (rem == null)
            {
                return null;
            }

            noteDb.Remainders.Remove(rem);
            await noteDb.SaveChangesAsync();

            return rem;
        }

        public async Task<bool> CreateRemainder(Remainder rem)
        {
            rem.UpdatedOn = DateTime.Now;
            noteDb.Add(rem);
            int ret = await noteDb.SaveChangesAsync();
            return ret > 0 ? true : false;
        }

        public async Task<Remainder> UpdateRemainder(Remainder remainder)
        {
            var ret = await noteDb.Remainders.FindAsync(remainder.RemainderId);
            if (ret == null)
            {
                return null;
            }

            ret.Name = remainder.Name;
            ret.Description = remainder.Description;
            ret.UpdatedOn = DateTime.Now;
            await noteDb.SaveChangesAsync();

            return remainder;
        }



        /// <summary>
        /// /////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="noteid"></param>
        /// <returns></returns>
        public async Task<NoteDTO> GetNote(int noteid)
        {
            return await noteDb.Notes.Where(f => f.NoteId == noteid)
                 .Select(s => new NoteDTO
                 {
                     NoteId = s.NoteId,
                     Name = s.Name,
                     Description = s.Description,
                     Category = s.Category,
                     Remainder = s.Remainder,
                     Status = s.Status
                 })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<NoteDTO>> GetNotes(int userid)
        {
            return await noteDb.Notes.Where(f => f.UserID == userid)
                .Select(s => new NoteDTO
                {
                    NoteId = s.NoteId,
                    Name = s.Name,
                    Description = s.Description,
                    Category = s.Category,
                    Remainder = s.Remainder,
                    Status = s.Status
                })
                .ToListAsync();
        }

        public async Task<Note> DeleteNote(int id)
        {
            var rem = await noteDb.Notes.FindAsync(id);               
            if (rem == null)
            {
                return null;
            }

            noteDb.Notes.Remove(rem);
            await noteDb.SaveChangesAsync();

            return rem;
        }

        public async Task<bool> CreateNote(Note note)
        {
            note.UpdatedOn = DateTime.Now;
            noteDb.Notes.Add(note);
            int ret = await noteDb.SaveChangesAsync();
            return ret > 0 ? true : false;
        }

        public async Task<Note> UpdateNote(Note note)
        {
            var ret = await noteDb.Notes.FindAsync(note.NoteId);
            if (ret == null)
            {
                return null;
            }

            ret.Name = note.Name;
            ret.Description = note.Description;
            ret.CategoryId = note.CategoryId;
            ret.RemainderId = note.RemainderId;
            ret.StatusId = note.StatusId;
            ret.UpdatedOn = DateTime.Now;
            await noteDb.SaveChangesAsync();

            return note;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public async Task<IEnumerable<NoteStatus>> GetNoteStatuses()
        {
            return await noteDb.NoteStatuses.ToListAsync();
        }

    }
}
