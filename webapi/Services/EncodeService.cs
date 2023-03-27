using System.Text;

namespace webapi.Controllers;
public class EncodeService: IEncodeService
{
    public string Base64Encode(string text)
    {
        var plainTextBytes = Encoding.UTF8.GetBytes(text ?? "");
        return Convert.ToBase64String(plainTextBytes);
    }

    public static string Base64Decode(string base64)
    {
        return Encoding.UTF8.GetString(Convert.FromBase64String(base64));
    }
}
