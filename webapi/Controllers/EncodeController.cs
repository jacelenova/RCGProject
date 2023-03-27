using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class EncodeController : ControllerBase
{
    private readonly IEncodeService _encodeService;

    public EncodeController(IEncodeService encodeService)
    {
        _encodeService = encodeService;
    }

    [HttpGet("base64encode")]
    public string Base64Encode(string text)
    {
        return _encodeService.Base64Encode(text);
    }
}
