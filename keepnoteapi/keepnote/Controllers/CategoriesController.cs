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
    public class CategoriesController : ControllerBase
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
        public CategoriesController(IOptions<AppSettings> appSettings, INoteRepository context)
        {
             _appSettings = appSettings.Value;
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {

            IEnumerable<Category> lst= await  _context.GetCategories(UserID);

            return Ok(lst);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.GetCategory(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            var retcategory= await _context.UpdateCategory(category);
            if (retcategory == null)
            {
                return NotFound();
            }

            return CreatedAtAction("GetCategory", new { id = retcategory.CategoryId }, retcategory); 
             
        }

        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            category.UserID = UserID;
            await _context.CreateCategory(category);            

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.DeleteCategory(id);
            if (category == null)
            {
                return NotFound();
            } 

            return category;
        } 
    }
}
