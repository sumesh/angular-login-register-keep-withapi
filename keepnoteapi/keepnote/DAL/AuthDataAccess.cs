using KeepNoteDB.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepNote.DAL
{
    public class AuthDataAccess
    {
        IAuthRepository dbService;
        public AuthDataAccess(IAuthRepository repo)
        {
            this.dbService = repo;
        }
    }
}
