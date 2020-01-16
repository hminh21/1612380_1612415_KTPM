const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export default class DynamicProperty {
    constructor() {
        this.name = 'unknown',
        this.schema = {}
    }

    static init(name, att = {}) {
        this.name = name;
        this.schema = att
        const model = mongoose.model(this.name, this.schema)
    }
}