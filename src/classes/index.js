// Классы в Javascript. Современные возможности язык.
// Подходы ООП, но другими способами.

// ООП. Что такое и как расшифровывается? Объекто ориентированно программирование.
// 3 принципа ООП?
// 1. Инкапсуляция.
// 2. Наследование.
// 3. Полиморфизм.

// Это буквально значит, программирование направленное на использование объектов.

const user = {
  firstName: 'Nik',
  lastName: 'Lapshin',

  // Функция.
  getFullName() {
    // что-то делает, скорее всего со свойствами объекта.
    // this - что это? Контекст вызова метода.
    // this === user в большинстве случае.
    // В некоторых случаях мы можем заменить контекст.
    return `${this.firstName} ${this.lastName}`;
  }
}; // синглтон - объект в единственном экземпляре.

// firstName, lastName и т.д. - что это ключ(свойство, параметр).
// 'Nik', 'Lapshin' - это значение ключа(свойства).
// getFullName() - это метод(функция, которая работает с объектом).
// Объект - набор свойств и методов, объединеных по какому-то принципу.
// ООП - это подход, который оперирует объектами.

// Нужно что-то, что будет создать объекты. Это является классом.
// Создает объекты и описывает свойства, методы и какие-то входные параметры.

// User - с большой буквы. Отличать класс от экземпляра класса.
// Большая буква - это класс. Маленькая - это экземпляр класса.
class User {
  // специальное слово, тело которого инициализирует класс.
  // = 'example@email.ru'
  constructor({ firstName, lastName, age = 100500, email }) {
    // Нет свойства age, хотим сделать по умолчанию.
    // Логика работы
    // 1. Проверяем есть age(не равен undefined)
    // 2. Если равен, то подставляем значение по-умолчанию, иначе
    // используем переданное.

    // Если поле объязательное
    if (!firstName) {
      throw new Error('firstName is not set');
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age; // 
    this.email = email;
  }

  /*
    Добавьте в класс метод fullName(), который в зависимости
    от возраста возвращает «Сэр Иван» (>=18 лет)
    Или
    «Мистер Иван» (<18 лет)
  */

  getFullName() {
    // Или Сэр или Мистер + ${this.firstName} ${this.lastName}
    return `${this.firstName} ${this.lastName}`;
  }

  // adult
  adult() { 
    return this.age < 18 
      ? `Mister ${this.firstName}` 
      : `Sir ${this.firstName}`
  }
}

// свойства передавать как объект
const nik = new User({ firstName: 'Nik', lastName: 'Lapshin', age: 33 });
const guest = new User({ firstName: 'Guest', lastName: 'Guest' });

console.log('nik', nik);
console.log('guest', guest);

console.log('nik getFullName', nik.getFullName());

// 1 Если понятно. Задавайте вопросы, не стесняйтесь.
// Инкапсуляция. Что это?
// Сокрытия реализации.

// class Account {
//   // private, protected и public
//   // скрытые, доступные только при наследовании и открытые(свойства, методы)

//   // Старый способ private
//   // _name = 'name'

//   // Новый способ private
//   #name = 'name'

//   _privateMetod() {

//   }

//   showPrivateName() {
//     console.log(this.#name);
//   }
// }

// const account = new Account();

// account.showPrivateName() //

// Мы наследуемся от User
class Account extends User {
  accountName = 'name';

  static doSomething() {
    console.log('do something')
  }

  static makeYoungMan() {
    return new Account({ age: 14 });
  }

  adult() {
    super.adult() 
    // специальное имя super обращаться к классу от которого мы наследовались.

    return this.age > 21 
      ? `Mister ${this.firstName}` 
      : `Sir ${this.firstName}`
  }
}

// Создаем объект вот так
// new Account();
// Account.doSomething();

const account = new Account({ firstName: 'test', lastName: 'test', age: 18 })

// console.log(account.adult());
Account.doSomething()

// Полиморфизм - один и тот же метод в разных видах реализовать.


class Car {
  #year = 1990;
  #color = 'black';

  get color() {
    return `Car color: ${this.#color}`
  }

  set color(value) {
    this.#color = value
  }

  get age() {
    const curYear = new Date().getFullYear();

    return curYear - this.#year;
  }
}

const car = new Car();

// console.log(car.color);
// car.color = 'Red';
// console.log(car.color);

console.log(car.age);

car.age = 500000;
console.log(car.age);

// 
