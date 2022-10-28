export class BaseAction {
    _title;
    _payload;

    execute() {
        // console.log('To be implemented in inherited classes...');
    }

    get title() {
        return this._title;
    }
}
