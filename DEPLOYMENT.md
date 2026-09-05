# 🚀 KTÜN Kariyer Portalı - Cloud & Production Deployment Guide

**Versiyon:** 1.0.0-rc1  
**Mimari:** React SPA (Nginx Container) + C# .NET 8 Web API + MS SQL Server 2022  

---

## 1. Local & Staging Deployment (Docker Compose)

Sistemi yerel sunucuda veya Staging ortamında tüm mikro servisleri (Web + API + DB) tek komutla ayağa kaldırmak için:

```bash
# 1. Ortam değişkenleri şablonunu kopyalayın
cp .env.example .env

# 2. Değişkenleri düzenleyin
nano .env

# 3. Docker Compose ile tüm sistemi başlatın
docker-compose up -d --build

# 4. Container durumunu kontrol edin
docker-compose ps
```

---

## 2. Production Azure / Cloud Deployment Steps

### 2.1 Web API (C# .NET 8)
1. **Azure App Service** (.NET 8 Linux/Windows Container) oluşturun.
2. App Service **Configuration -> Application Settings** alanından aşağıdaki secret'ları tanımlayın:
   - `ASPNETCORE_ENVIRONMENT`: `Production`
   - `ConnectionStrings__DefaultConnection`: `Server=your_sql_server;Database=KtunCareerPortalDb;...`
   - `JwtSettings__Secret`: `[ENCRYPTED_256BIT_SECRET_KEY]`
3. `GET /health` endpoint'ini **Health Check** izleme aracına ekleyin.

### 2.2 Frontend Web App (Nginx / Azure Static Web Apps)
1. Docker image'ı Azure Container Registry (ACR) ortamına push edin:
   ```bash
   docker tag ktun-kariyer-portal:latest youracr.azurecr.io/ktun-kariyer-portal:v1.0.0
   docker push youracr.azurecr.io/ktun-kariyer-portal:v1.0.0
   ```
2. Web App Container ortamına yayınlayın.

---

## 3. Monitoring & Health Verification

Canlı ortam durumunu ve veritabanı sağlık seviyesini doğrulamak için:

```http
GET https://api.kariyer.ktun.edu.tr/health
```

**Beklenen Yanıt (HTTP 200 OK):**
```json
{
  "status": "Healthy",
  "database": "Connected",
  "allocatedRamMB": 42.5,
  "timestamp": "2026-08-05T18:34:00Z"
}
```

---

## 4. Rollback Procedure (Geri Alma)

Bir sorun yaşanması durumunda önceki sürüme geri dönmek için:

```bash
# Docker rollout geri alma
docker-compose down
git checkout v1.0.0-rc1
docker-compose up -d --build
```
