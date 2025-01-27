# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar los archivos de los proyectos
COPY ./API/API.csproj ./API/
COPY ./Infrastructure/Infrastructure.csproj ./Infrastructure/
COPY ./Core/Core.csproj ./Core/

# Restaurar dependencias
RUN dotnet restore ./API/API.csproj

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir el proyecto
RUN dotnet build ./API/API.csproj -c Release -o /app/build

# Publicar la aplicación
RUN dotnet publish ./API/API.csproj -c Release -o /app/out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Exponer el puerto de la aplicación
EXPOSE 80
ENTRYPOINT ["dotnet", "API.dll"]