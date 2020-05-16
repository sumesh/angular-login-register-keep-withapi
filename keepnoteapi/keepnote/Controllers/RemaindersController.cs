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
    public class RemaindersController : ControllerBase
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
        public RemaindersController(IOptions<AppSettings> appSettings, INoteRepository context)
        {
             _appSettings = appSettings.Value;
            _context = context;
        }

        // GET: api/Remainders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Remainder>>> GetRemainders()
        {

            IEnumerable<Remainder> lst= await  _context.GetRemainders(UserID);

            return Ok(lst);
        }

        // GET: api/Remainders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Remainder>> GetRemainder(int id)
        {
            var remainder = await _context.GetRemainder(id);

            if (remainder == null)
            {
                return NotFound();
            }

            return remainder;
        }

        // PUT: api/Remainders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRemainder(int id, Remainder remainder)
        {
            if (id != remainder.RemainderId)
            {
                return BadRequest();
            }

            var retremainder= await _context.UpdateRemainder(remainder);
            if (retremainder == null)
            {
                return NotFound();
            }

            return CreatedAtAction("GetRemainder", new { id = retremainder.RemainderId }, retremainder); 
             
        }

        // POST: api/Remainders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Remainder>> PostRemainder(Remainder remainder)
        {
            remainder.UserID = UserID;
            await _context.CreateRemainder(remainder);            

            return CreatedAtAction("GetRemainder", new { id = remainder.RemainderId }, remainder);
        }

        // DELETE: api/Remainders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Remainder>> DeleteRemainder(int id)
        {
            var remainder = await _context.DeleteRemainder(id);
            if (remainder == null)
            {
                return NotFound();
            } 

            return remainder;
        } 
    }
}
