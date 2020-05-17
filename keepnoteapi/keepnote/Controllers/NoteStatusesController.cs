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
    public class NoteStatusesController : ControllerBase
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
        public NoteStatusesController(IOptions<AppSettings> appSettings, INoteRepository context)
        {
             _appSettings = appSettings.Value;
            _context = context;
        }

        // GET: api/notestatuses   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteStatus>>> GetNoteStatus()
        {

            IEnumerable<NoteStatus> lst = await _context.GetNoteStatuses();

            return Ok(lst);
        }
    }
}
