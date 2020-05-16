using KeepNoteDB.KeepDB;
using KeepNoteDB.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeepNoteDB.Repository
{
    public class AuthRepository : IAuthRepository
    {
        readonly NoteDbContext authDb;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public AuthRepository(NoteDbContext dbContext)
        {
            this.authDb = dbContext;
        }

        public bool CreateUser(User user)
        {
            if (!IsUserExists(user.Username))
            {
                authDb.Add(user);
                int ret = authDb.SaveChanges();
                return ret > 0 ? true : false;
            }
            else
            {
                throw new Exception("User Name already exists");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public bool IsUserExists(string username)
        {
            var usr = authDb.Users.Where(u => u.Username == username);
            if (usr.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public User GetUser(int userid)
        {
            var usr = authDb.Users.Where(u => u.UserId == userid).FirstOrDefault();
            return usr; 
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public User LoginUser(User user)
        {
            var logusr = authDb.Users
                .Where(u => u.Username == user.Username && u.Password == user.Password)
                .FirstOrDefault();
            return logusr; 
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool UpdateUser(User user)
        {
            User logusr = GetUser(user.UserId);
            if(logusr!=null)
            {
                logusr.Name = user.Name;
                logusr.EmailId = user.EmailId;

                int ret = authDb.SaveChanges();
                return ret > 0 ? true : false;
            }
            else
            {
                throw new Exception("Please try again.");
            }
        }
    }
}
