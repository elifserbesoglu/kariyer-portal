namespace Ktun.CareerPortal.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Persistence;

public interface IRepositorySpec<TEntity, TId> where TEntity : class
{
    Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default);
    void Update(TEntity entity);
    void Delete(TEntity entity);
}

public class RepositorySpec<TEntity, TId> : IRepositorySpec<TEntity, TId> where TEntity : class
{
    protected readonly KtunDbContextSpec _dbContext;

    public RepositorySpec(KtunDbContextSpec dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Set<TEntity>().FindAsync(new object[] { id! }, cancellationToken);
    }

    public async Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Set<TEntity>().ToListAsync(cancellationToken);
    }

    public async Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        await _dbContext.Set<TEntity>().AddAsync(entity, cancellationToken);
        return entity;
    }

    public void Update(TEntity entity)
    {
        _dbContext.Set<TEntity>().Update(entity);
    }

    public void Delete(TEntity entity)
    {
        _dbContext.Set<TEntity>().Remove(entity);
    }
}

public interface IUnitOfWorkSpec
{
    Task<int> CommitAsync(CancellationToken cancellationToken = default);
}

public class UnitOfWorkSpec : IUnitOfWorkSpec
{
    private readonly KtunDbContextSpec _dbContext;

    public UnitOfWorkSpec(KtunDbContextSpec dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> CommitAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
