using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeepNoteDB.Model
{
   public class Category
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int UserID { get; set; }

        public DateTime UpdatedOn { get; set; }

    }
}
