
self.addEventListener('fetch', function(event) {
    if (event.request.url.substring(0, 5) !== 'https') {
        const httpsURL = 'https' + event.request.url.substr(4);
        event.respondWith(
            fetch(httpsURL, {
                mode: 'no-cors'
            })
        );
    }
});
