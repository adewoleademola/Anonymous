const fs = require('fs');

class FileStorage {
    constructor(fileName) {
        this.fileName = fileName;
        this.setup()
    }

    setup() {
        this._objects = {
            Message: {},
            Admin: {},
        }
    }

    new (obj, key=null) {
        let objName = obj.constructor.name;
        if (!key) {
            key = `${objName}.${obj.id}`;
        }
        this._objects[objName][key] = obj.to_dict()
    }

    all() {
        return this._objects;
    }

    reload() {
        this.setup()
        let content = null;
        try {
            content = fs.readFileSync(this.fileName, 'utf-8')
        } catch (err) {
            console.log("Error occured while reading file")
        }
        if (content) {
            this._objects = JSON.parse(content)
        }
    }

    save() {
        let content = JSON.stringify(this._objects);
        try {
            fs.writeFileSync(this.fileName, content, 'utf-8')
        } catch (err) {
            console.log('Something went wrong when saving file: ' + err.message)
        }
    }
}

module.exports = FileStorage;