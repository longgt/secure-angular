module.exports = {
    realm: 'sso-realm',
    clientID: 'app-expressjs',
    clientSecret: 'a7b8bc9e-5a46-49a7-a114-1d36f923e845',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhvCnkzltlF3S5ztbpSq+1QdTf35st8Xqd4WvjFvom82WEj6Yrk1WB8p/K/eQpRnHj/5LamgdyUyEQHSu2/VJ7S7TO9axuXcBgswanP/fwmjkT6/Eb2tqShwByvPpxW63mgNOa4zMpMOrVONLuFAwh5Q8X8X7P/TeVnqjvNR5ol5W5LQVU18GtByBLycjM0IVhWeh2pM9RT3ecbXfp1jJtHRow49ZNw003rjkw5yKrf1Jp6jPC7hWsjpczutHeJlxEinsPbAOYa+FinvwwSs7z0FAg3KPLh/6hUyyLd9vDgh3ojkNYDgifxSBjjg8mTNrIHD/MAUi1s0kW2FW3PipYwIDAQAB',
    redirectURI: 'http://localhost:3000/oauth-callback',
    codeChallenge: false, // enable PKCE-enhanced Authorization Code Flow
    codeChallengeMethod: 'S256', // 'S256' or 'plain'
    verifyTokenAudience: false,
    // Host
    hosts: {
        auth: 'http://localhost:8080/auth',
        client: 'http://localhost:4200',
        // Local GitLab instance
        gitlab: 'https://gitlab.example.com'
    },

    // Ports
    clientPort: 4200,
    serverPort: 3000,

    // Session
    session: { 
        name: 'keycloak-sessionid',
        secret: 'abda5a3bfd06',
        fileStorePath: 'file-store-sessions',
        sameSite: 'lax'
    }
};