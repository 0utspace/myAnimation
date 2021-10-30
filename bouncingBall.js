let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Теперь давайте изобразим летающий по «холсту» мяч. При столкновении с одной из границ он будет отскакивать назад, меняя направление,
//     словно резиновый.
//     Мы создадим для нашего мяча JavaScript-объект, написав для этого
// конструктор Ball. Объект будет хранить скорость мяча и направление его движения с помощью двух свойств, xSpeed и ySpeed.
//     Горизонтальная скорость мяча будет определяться значением xSpeed,
//     а вертикальная — ySpeed.

let width = canvas.width //ширина розміру канваса
let height = canvas.height//висота розміру канваса. Вони використовуються кругом замість статичних значень

//створимо масив з кольорами.
let colorsForBalls =  ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
//створимо функцію, для вибору рандомного значення з масиву
function randomColor (){
    return colorsForBalls[Math.floor(Math.random() * colorsForBalls.length)]
}

//створимо конструктор Ball. Це функція, яка буде створювати пари ключ - значення для змінних. Тобто створювати з них
// об'єкти за допомогою ключового слова new
let Ball = function () {
    this.x = width/2;
    this.y = height/2;
    this.xSpeed = Math.floor(Math.random() * 10 - 5); //число від -5 до +5
    this.ySpeed = Math.floor(Math.random() * 10 - 5);
    this.color = randomColor ()
}
//ключ-значення this.xSpeed = -2 та  this.ySpeed = 3 означає, що м'яч буде рухатись вліво та вниз - тобто по діагоналі

//створю пустий масив, куди наповню створені об'єкти-м'ячі
let arrayOfBalls = [];
for (let i = 0; i < 10; i++){
    arrayOfBalls[i] = new Ball()
}
console.log(arrayOfBalls);

//створимо функцію, яка малює заповнене або обведене коло - в залежності від значення параметра - тру чи фолс
function circles(x, y, radius, isFill) {
    ctx.beginPath()
    ctx.arc(x,y,radius, 0, Math.PI * 2, false)
    if (isFill){
        ctx.fill()
    }
    else {
        ctx.stroke()
    }
}
//тепер додамо цю функцію в прототип конструктора Ball. В результаті ми зможемо застосовувати цю функцію, як метод для
// всіх об'єктів створених конструктором Ball
Ball.prototype.draw = function () {
    ctx.fillStyle = this.color;
    circles(this.x, this.y, 8, true )
}
//тобто метод draw буде застосовувати до об'єктів функцію, яка буде брати в аргумент значення КЛЮЧА поточного об'єкта Х
// та У, з радіусом 3 та з заповненням

//для того, щоб м'яч рухався нам потрібно оновлювати його координати, по яким він буде малюватись. Оновлюватись ці
// координати будуть відповідно до значень "швидкості" м'яча по xSpeed/ySpeed. Тобто до поточної координати Х ми будемо
// додавати значення швидкості по координаті xSpeed. Таким чинам координати м'яча будуть постійно змінюватись
//створимо метод з функцією, яка буде оновлювати данні для обох вісей - Х та У відповідно до їх "швидкості" руху
Ball.prototype.move = function () {
    this.x += this.xSpeed
    this.y += this.ySpeed
}

//створимо метод, який буде слідкувати, коли наш о'бєкт - м'яч доторкнеться до межі канвасу. Тоді він зміниться напрям
// руху м'яча - тобто заміниться значення "швидкості" м'яча по вісям на протилежні. Тобто помножить на мінус 1

Ball.prototype.bounce = function () {
    if (this.x > width || this.x < 0) {
        this.xSpeed = -this.xSpeed
    }
    if (this.y > height || this.y < 0){
        this.ySpeed = -this.ySpeed
    }
}

//складемо все разом за допомогою інтервала setInterval
let ball = new Ball() //створили об'єкт ball за допомогою конструктора Ball

setInterval(function () {
    ctx.clearRect(0,0,width,height)//перед кожним циклом будемо очищувати канвас
    for (let i = 0; i < arrayOfBalls.length; i++){
        arrayOfBalls[i].draw() //функція малює коло на основі данних з об'єкту ball
        arrayOfBalls[i].move() //функція оновлює координати об'єкта, на основі "швидкості-напрямку" руху xSpeed, ySpeed
        arrayOfBalls[i].bounce() //перевіряє чи не дійшов м'яч до межі канваса і тоді "відіб'є" його в інший бік - змінить рух на "-"
    }
    ctx.strokeRect(0,0,width,height);
},10)