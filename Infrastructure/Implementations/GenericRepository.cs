using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations;

public class GenericRepository<T>(Bingo75Context context): IGenericRepository<T> where T : BaseEntity
{
    public async Task<T?> GetByIdAsync(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public async Task<IList<T>> ListAllAsync()
    {
        return await context.Set<T>().ToListAsync();
    }
    
    public T AddAsync(T entity)
    {
        return context.Set<T>().Add(entity).Entity;
    }

    public T UpdateAsync(T entity)
    {
        var trackedEntity = context.Set<T>().Local.FirstOrDefault(e => e.Id == entity.Id);
        if (trackedEntity != null)
        {
            context.Entry(trackedEntity).State = EntityState.Detached;
        }
        var updatedEntity = context.Set<T>().Attach(entity).Entity;
        context.Entry(entity).State = EntityState.Modified;
        return updatedEntity;
    }

    public T DeleteAsync(T entity)
    {
        var trackedEntity = context.Set<T>().Local.FirstOrDefault(e => e.Id == entity.Id);
        if (trackedEntity != null)
        {
            context.Entry(trackedEntity).State = EntityState.Detached;
        }
        return context.Set<T>().Remove(entity).Entity;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public bool Exists(int id)
    {
        return context.Set<T>().Any(x => x.Id == id);
    }
}
