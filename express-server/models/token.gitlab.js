class GitlabToken {
    constructor(access_token, token_type, refresh_token, scope, created_at) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.refresh_token = refresh_token;
        this.scope = scope;
        this.created_at = created_at;
    }

    save(payloadJson) {
        try {
            const payload = typeof payloadJson === 'string' ? JSON.parse(payloadJson) : payloadJson;
            this.access_token = payload.access_token;
            this.token_type = payload.token_type;
            this.refresh_token = payload.refresh_token;
            this.scope = payload.scope;
            this.created_at = payload.created_at;
        } catch (e) {

        }
    }
}

module.exports = GitlabToken;