using RCGCodingTest.SignalR;
using webapi.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
builder.Services.AddSignalR(options =>
{
    options.MaximumParallelInvocationsPerClient = 10;
});
builder.Services.AddScoped<IEncodeService, EncodeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseRouting();

app.UseCors(policy =>
{
    //policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    //policy.WithOrigins("https://localhost:*").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    policy.SetIsOriginAllowed(host => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<TaskHub>("/taskhub");

app.Run();
