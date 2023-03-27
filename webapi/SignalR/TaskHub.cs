using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using System;
using webapi.Controllers;
using webapi.Models;

namespace RCGCodingTest.SignalR
{
    public class TaskHub: Hub
    {
        private readonly IEncodeService _encodeService;
        private readonly IMemoryCache _memoryCache;
        private readonly Random _random;

        private const string RECEIVE_MESSAGE = "ReceiveMessage";


        public TaskHub(IEncodeService encodeService, IMemoryCache memoryCache)
        {
            _encodeService = encodeService;
            _memoryCache = memoryCache;
            _random = new Random();
        }

        public async Task EncodeMessage(HubEncodeMessage msg)
        {
            var connId = Context.ConnectionId;
            var currToken = GetExistingToken(msg.id);
            currToken?.Cancel();

            if (!string.IsNullOrEmpty(msg.message))
            {
                CancellationTokenSource cts = new CancellationTokenSource();
                var token = cts.Token;
                _memoryCache.Set(msg.id, cts);

                var encoded = _encodeService.Base64Encode(msg.message);
                var index = 0;

                await Task.Run(async () =>
                {
                    var cl = Clients;
                    while (!token.IsCancellationRequested)
                    {
                        var period = TimeSpan.FromSeconds(_random.Next(5) + 1);
                        await Task.Delay(period, token);
                        try
                        {
                            if (!token.IsCancellationRequested)
                            {
                                var res = new HubEncodeMessage() { id = msg.id, message = encoded[index].ToString() };
                                await cl.Client(connId).SendAsync(RECEIVE_MESSAGE, res);
                                index++;
                                if (index == encoded.Length)
                                {
                                    cts.Cancel();
                                }
                            }
                        }
                        catch (Exception)
                        {
                            cts.Cancel();
                        }
                    }
                    await Clients.Client(connId).SendAsync(RECEIVE_MESSAGE, new HubEncodeMessage() { id = msg.id, message = "Done" });
                    _memoryCache.Remove(msg.id);
                });
            }
        }

        public void Cancel(Guid id)
        {
            var token = GetExistingToken(id);
            token?.Cancel();
        }

        private CancellationTokenSource? GetExistingToken(Guid id)
        {
            CancellationTokenSource? token;
            _memoryCache.TryGetValue<CancellationTokenSource?>(id, out token);

            return token;
        }
    }
}
