using KeepNoteDB.Model;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeepNoteDB.Repository
{
    public interface IAuthRepository
    {
        bool CreateUser(User user);

        bool IsUserExists(string username);

        User LoginUser(User user);

        User GetUser(int user);

        bool UpdateUser(User user);
    }
}
