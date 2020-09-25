class GitHubToken {
    constructor(access_token, token_type, scope) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.scope = scope;
    }
}

module.exports = GitHubToken;