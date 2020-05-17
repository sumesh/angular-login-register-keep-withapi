using System; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 

namespace KeepNoteDB.Model
{
    public class Note
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NoteId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
       
        public Category Category { get; set; }

        public int RemainderId { get; set; }
      
        public Remainder Remainder { get; set; }

        public int StatusId { get; set; }

       
        public NoteStatus Status { get; set; }

        public int UserID { get; set; }

        public DateTime UpdatedOn { get; set; }  
    }

    public class NoteDTO
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NoteId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; } 

        public Category Category { get; set; }

        public Remainder Remainder { get; set; }

       
        public NoteStatus Status { get; set; } 
   

        public DateTime UpdatedOn { get; set; }
    }
}
