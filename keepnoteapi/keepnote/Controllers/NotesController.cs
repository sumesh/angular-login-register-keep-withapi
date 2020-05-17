using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KeepNoteDB.KeepDB;
using KeepNoteDB.Model;
using KeepNoteDB.NoteRepository;
using Microsoft.Extensions.Options;
using KeepNote.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace KeepNote.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private   INoteRepository _context;
        private readonly AppSettings _appSettings;

        private int UserID
        {
            get
            {
                return Convert.ToInt32(User.Identity.Name);
            }
        }
        public NotesController(IOptions<AppSettings> appSettings, INoteRepository context)
        {
             _appSettings = appSettings.Value;
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {

            IEnumerable<NoteDTO> lst= await  _context.GetNotes(UserID);

            return Ok(lst);
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoteDTO>> GetNote(int id)
        {
            var note = await _context.GetNote(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, Note note)
        {
            if (id != note.NoteId)
            {
                return BadRequest();
            }
    
            var retnote= await _context.UpdateNote(note);
            if (retnote == null)
            {
                return NotFound();
            }

            return CreatedAtAction("GetNote", new { id = retnote.NoteId }, retnote); 
             
        }

        // POST: api/Notes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostNote(Note note)
        {
            note.UserID = UserID; 
            await _context.CreateNote(note);            

            return CreatedAtAction("GetNote", new { id = note.NoteId }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(int id)
        {
            var note = await _context.DeleteNote(id);
            if (note == null)
            {
                return NotFound();
            } 

            return note;
        } 
    }
}
