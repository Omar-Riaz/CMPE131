export default class annotationMap extends Map<String, Array> {
    constructor(obj){
      super(obj);
    }
    //set a collection of keys to a value obj
    add(keys:Array<String>, value){
      keys.map(key=>{						//Bad to do this??? Something about setting a collection in a loop????
        this.set(key, this.get(key) == null ? new Array(value) : this.get(key).concat(value));
      });
      return this;
    }
    deleteAnnotation(keys:Array<String>, field:String){
      keys.map(channel=>{
        this.set(channel, this.get(channel).filter(elem=>elem.quote != field));
      });
      return this;
    }
    editAnnotation(keys:Array<String>, field:String, newField:String){
      keys.map(channel=>{
        this.get(channel)[this.get(channel).findIndex(elem=>elem.quote == field)].annotation = newField;
      });
      return this;
    }
    keysAsArray() {
      return Array.from(this.keys());
    }
}