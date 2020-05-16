using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace KeepNoteDB.Model
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string Name { get; set; }

        public string EmailId { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        public string Password { get; set; }
 
    }

    public class UserDTO
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string Name { get; set; }

        public string EmailId { get; set; }

        public string Token { get; set; }
    }
}
