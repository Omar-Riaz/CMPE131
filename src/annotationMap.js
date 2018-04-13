export default function() {
  class annotationMap extends Map<String, Array> {
    constructor(obj){
      super(obj);
    }
    add(key:String, value){
      this.set(key, this.get(key).concat(value));
    }
    deleteAnnotation(keys:Array, field:String){
      channels.map(channel=>{
        this.set(channel, this.valueOf(key).filter(elem=>elem.quote != field));
      });
    }
  }
}