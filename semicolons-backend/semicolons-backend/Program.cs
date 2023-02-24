using Microsoft.EntityFrameworkCore;
using semicolon.DB;
using semicolon.Repository.SkillRepository;
using semicolon.Repository.UserRepository;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SemicolonDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SemicolonsDB"));
});
builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<ISkill, SkillService>();

var _logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration).Enrich.FromLogContext()
    //.MinimumLevel.Information()
    //.WriteTo.File("D:\Migration Task\SalesAndInventoryV1.0.2\Logs", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Logging.AddSerilog(_logger);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.UseCors(x => x

            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true) // allow any origin
            .AllowCredentials()); // allow credentials

app.MapControllers();

app.Run();
