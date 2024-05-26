export class PlayerError extends Error {
    code: string;
    message: string;
    constructor(code: string, name: string,message: string) {
        super();
        this.code = code;
        this.name = name;
        this.message = message;
    }

    toString() {
        return `%c◼️  ErrorName: %c${this.name}%c\n◻️  Message: %c${this.message}`;
    }

    getStyles() {
        return [
            "color: rgb(82, 82, 156); font-weight: bold; font-size: 15px; line-height: 2;",
            "color: #333; font-size: 13px; line-height: 2;",
            "color: rgb(82, 82, 156); font-weight: bold; font-size: 15px; line-height: 2;",
            "color: #666; font-size: 13px; line-height: 2;",
        ];
    }

}
