export class User {
    constructor(
      public nickname: string,
      public login: string,
      public password: string,
      public forums: string[]
    ) {}

    get() {
        return {
            nickname: this.nickname,
            login: this.login,
            password: this.password,
            forums: this.forums
        }
    }
}