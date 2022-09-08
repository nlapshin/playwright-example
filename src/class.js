const { faker } = require('@faker-js/faker')

const teacher = {
  name: 'Nikolay',
  surname: 'Lapshin',
  age: 32,
  languages: [ 'Javascript' ],
  expirience: 8
}

/*
const user = makeUser('Nikolay', 'Lapshin', 32)
const student1 = makeUser('Masha', 'Petrova', 25)

const users = [] // Массив пользователей

for(let i = 0; i < 100; i++) {
  users.push(makeUser('Nikolay', 'Lapshin', 32))
}

console.log(users)
*/


// name, surname, age - это свойства объекта
// fullName - это метод(функция) объекта
// this - это ссылка на объект в контексте которого вызван метод

//user.fullName() // user - контекст
//user.fullName.call(teacher); // teacher

// Что мне нужно создать, чтобы создавать юзеров

//console.log(makeUser('Nik', undefined, 100500))

// commonJS и import/exports.
// commonJS - изначально был в nodeJS.
// import/exports - это новая фича новых стандартов Javascript(до 5 пяти лет)
// import/exports - Typescript

// class
// User - это класс. const user = new User() - это экземпляр класса

function makeUser(name, surname, age) {
  return {
    name: name || faker.name.firstName(), // Если есть name, то используем его, если name нет, то генерируем
    surname: surname || faker.name.lastName(),
    age: age || faker.age(),
    fullName() {
      return this.name + ' ' + this.surname
    }
  }
}

class User {
  constructor(name, surname, age) {
    this.name = name || faker.name.firstName()
    this.surname = surname || faker.name.lastName()
    this.age = age || faker.datatype.number()
  }

  get fullName() {
    return this.name + ' ' + this.surname
  }
}

const user = new User()

console.log(user)
console.log(user.fullName)
// User { name: 'Selina', surname: 'Robel', age: 32385 }



// 
// - Создаю переменную pom
// - Создаю экземпляр из класса PlaywrightDevPage
// - Присваю экземпляр переменной pom 
// const pom = new PlaywrightDevPage(page, 'https://playwright.dev')
// pom.goto()
