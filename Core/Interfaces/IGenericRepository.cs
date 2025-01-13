using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IList<T>> ListAllAsync();
    void AddAsync(T entity);
    void UpdateAsync(T entity);
    void DeleteAsync(T entity);
    Task<bool> SaveChangesAsync();
    bool Exists(int id);
}
