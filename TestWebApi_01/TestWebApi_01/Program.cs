using TestWebApi_01.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.WithOrigins(["http://localhost:3000"]).AllowAnyMethod().AllowAnyHeader());

app.MapGet("/", () => "Hello World!");

app.MapPost("/login", (Login login) => {
    Console.WriteLine(login.ToString());
    string token = login.Email.Length > 0 && login.Password.Length > 0 ? "123456" : "";
    return token;
});

app.Run();
