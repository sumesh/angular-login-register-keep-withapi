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

        public  async Task<IEnumerable<Category>> GetCategories(int userid)
        {
            return  await noteDb.Categories.Where(f => f.UserID == userid).ToListAsync();
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
 
 
         
 

        public Note GetNote(int userid)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Note> GetNotes(int userid)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteNote(Note category)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateNote(Note category)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<NoteStatus> GetNoteStatus()
        {
            throw new NotImplementedException();
        }
    }
}
