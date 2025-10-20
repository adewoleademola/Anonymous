const uuid = require('uuid');
const FileStorage = require('../utils/fileStorage')
const storage = new FileStorage('./AnonymousDB');

class BaseModel {
    constructor() {
        this.id = uuid.v4();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    save (key=null) {
        this.updatedAt = new Date();
        storage.reload()
        storage.new(this, key)
        storage.save()
    }

    to_dict() {
        return this;
    }

    static update(key=null, data) {
        storage.reload()
        storage.all()[key] = data;
        storage.save()
    }

    static search(obj, key=null) {
        storage.reload();
        let result = storage.all()[obj];
        if (key) {
            return result[key];
        }
        return result;

    }
}

module.exports = BaseModel