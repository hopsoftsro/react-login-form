namespace TestWebApi_01.Models;

public record Login
{   
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;

}
