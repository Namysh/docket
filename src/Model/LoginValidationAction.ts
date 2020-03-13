export default class LoginValidationAction {
    constructor(public username: string,
                public password: string,
                public autoSelectServer: boolean,
                public serverId: number) {
    }
}

