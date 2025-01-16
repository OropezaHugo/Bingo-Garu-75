using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IList<T>> ListAllAsync();
    T AddAsync(T entity);
    T UpdateAsync(T entity);
    T DeleteAsync(T entity);
    Task<bool> SaveChangesAsync();
    bool Exists(int id);
}
