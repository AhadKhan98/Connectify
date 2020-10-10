const githubOAuth = require("github-oauth")({
    githubClient: '516fab70768fd90cef0a',
    githubSecret: 'cb99b1f7a23b6aaba0361151f0ea2295911b6a7f',
    baseURL: 'http://localhost:' + 3000,
    loginURI: '/auth/github',
    callbackURI: '/auth/github/callback',
});

module.exports = githubOAuth;

