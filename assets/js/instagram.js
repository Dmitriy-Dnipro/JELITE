$(function() {
    var feed = new Instafeed({
        //get: 'tagged',
        //target: 'instafeed',
        //tagName: 'awesome',
        get: 'user',
        userId: '2230645909',
        limit: 3,
        sortBy: 'most-recent',
        resolution: 'low_resolution',
        clientId: '4f34b3b3005b42858e30a923c012e907',
        accessToken: '2230645909.4f34b3b.7ecc371eda7a4479aa6e11b6a7a77a0f'
    });
    feed.run();
});