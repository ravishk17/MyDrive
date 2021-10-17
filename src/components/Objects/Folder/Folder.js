export class Folder {
  constructor(id, name, parentName, level) {
    this.id = id;
    this.parentName = parentName;
    this.name = name;
    this.children = [];
    this.level = level;
  }
  addObject(obj) {
    this.children.push(obj);
  }
  removeObject(objId) {
    this.children.filter((obj) => {
      return obj.id !== objId;
    });
  }
}
