/* eslint-disable prefer-const */
import "reflect-metadata";
function faz(constuctor: any) {
  const q = class extends constuctor{
    baz = 40
    constructor(name: string) {
      super()
      this.bar = name
    }
  }
  return <any>q
}
function first() {
  
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const childFunction = descriptor.value; // можем забрать 10
    // этот декоратор забирает управление функцией на себя
    // тобишь заменяет её собой но при этом её вызывает
    
    descriptor.value = function (this:any, age:number) {
     
      
      
      //console.log('first-arg', age)
      //console.log('finih first -----------')
      this.response = this.bar + age
      return childFunction.call(this, age);
      //return `${childFunction()} - ${age} - zp`.toUpperCase()
      
    }
    
   
    
  };
}
function second(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const childFunction = descriptor.value;
  // данный следующий в цепочке, он берет и возвращает значение, обратно 
  // в декоратор first который принимает аргументы, которые вернет этот декоратор
  descriptor.value = function (this: any, value: any) {
    
    
    
    console.log('second-prev', this)
    //console.log('second-arg', value)
    this.bar = this.bar.toUpperCase()
    return childFunction.call(this, `${value + 30} - zp - 50`)
  }
 
  
}
function laster(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // последний декоратор может забрать управление себе и вернуть 150
  // или может передать аргумент обратно предыдущему по цепочке, а именно second
  // в аргумент который он ждет
  const childFunction = descriptor.value;
  descriptor.value = function (this: any, value: number) {
    //console.log('last',childFunction())
    this.bar = this.bar + 'peta'
    return childFunction.call(this, value + 10);
    
  }
  
}
/**
 * композиция из декораторов, где родителем является первая функция входа это size
 * далее идет first second laster, все они возвращают аргумент предыдущей функции, в обратном порядке
 * но управление может забрать одна из функций она и станет главной
 * в descriptor.value является хранилищем в котором постоянно новое значени которое прошло и изменено через декоратор
 * 
 */


@faz
class Foo {
  bar = "www"
  far
  constructor(name:string) {
    this.bar = name
    this.far = name
  }
  @laster
  @second
  @first()
  size(age: number) {
    console.log('size',this)
    return `vasa - ${age} `.toUpperCase()
  }
}

export default Foo