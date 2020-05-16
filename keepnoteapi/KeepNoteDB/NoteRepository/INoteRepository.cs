using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KeepNoteDB.Model;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace KeepNoteDB.NoteRepository
{
    public interface INoteRepository
    {
        Task<Category> GetCategory(int userid);

        Task<IEnumerable<Category>> GetCategories(int userid);

        Task<Category> DeleteCategory(int categoryid);

        Task<bool>CreateCategory(Category category);

        Task<Category> UpdateCategory(Category category);


        /// <summary>
        /// Remainder Section
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        Task<Remainder> GetRemainder(int userid);

        Task<IEnumerable<Remainder>> GetRemainders(int userid);

        Task<Remainder> DeleteRemainder(int categoryid);

        Task<bool> CreateRemainder(Remainder category);

        Task<Remainder> UpdateRemainder(Remainder category);


        /// <summary>
        /// Note
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        Note GetNote(int userid);

        IEnumerable<Note> GetNotes(int userid);

        Task<bool> DeleteNote(Note category);

        Task<bool> UpdateNote(Note category);

        IEnumerable<NoteStatus> GetNoteStatus();



    }
}
