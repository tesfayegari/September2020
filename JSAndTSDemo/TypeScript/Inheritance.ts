class Animal {
  numberOfLegs: number;
  name: string;
  protected pvtProperty: string;
  sayName() {
    return this.name;
  }
}


class Pet extends Animal {
  public  getName (){
    return this.sayName()
  }

}

let puppy = new Pet();
puppy.getName()