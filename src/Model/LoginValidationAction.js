class LoginValidationAction {
        constructor(username, password, autoSelectServer, serverId){
        this.username = username;
        this.password = password;
        this.autoSelectServer = autoSelectServer;
        this.serverId = serverId;
    }
}
module.exports = LoginValidationAction;

