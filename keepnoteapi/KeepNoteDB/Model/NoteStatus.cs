using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeepNoteDB.Model
{
    public class NoteStatus
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusID { get; set; }

        public string Status { get; set; }
    }
}
