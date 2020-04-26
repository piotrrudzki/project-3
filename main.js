const btnStart = document.querySelector("button");
let fields = [...document.querySelectorAll(".field")];
const kicks = [
    "shoes1",
    "shoes2",
    "shoes3",
    "shoes4",
    "shoes5",
    "shoes6",
    "shoes7",
    "shoes8",
    "shoes9",
    "shoes1",
    "shoes2",
    "shoes3",
    "shoes4",
    "shoes5",
    "shoes6",
    "shoes7",
    "shoes8",
    "shoes9",
];
const activeFields = [];
let activeField = '';
const pairs = kicks.length / 2;
let result = 0;
const gameStart = new Date().getTime();

// funkcja inicializująca
function start() {
    fields.forEach(field => {
        const random = Math.floor(Math.random() * kicks.length);
        field.classList.add(kicks[random]);
        kicks.splice(random, 1);
    })
};



function clickField(e) {
    activeField = e.target;
    if (activeField === activeFields[0]) return;
    activeField.classList.remove('hidden');
    if (activeFields.length === 0) {
        activeFields[0] = activeField;
        return;
    } else {
        fields.forEach(field => field.removeEventListener('click', clickField));
        activeFields[1] = activeField;
        setTimeout(function () {
            if (activeFields[0].className === activeFields[1].className) {
                activeFields.forEach(field => field.classList.add('off'));
                result++;
                fields = fields.filter(field => !field.classList.contains('off'));
                if (result == pairs) {
                    const gameEnd = new Date().getTime();
                    const gameTime = (gameEnd - gameStart) / 1000;
                    alert(`You win. Game time: ${gameTime} seconds!`);
                    location.reload();
                }
            } else {
                activeFields.forEach(field => field.classList.add('hidden'));
            }
            activeField = '';
            activeFields.length = 0;
            fields.forEach(field => field.addEventListener('click', clickField));
        }, 500);
    }
};

function startGame() {
    start();
    setTimeout(function () {
        fields.forEach(field => {
            field.classList.add('hidden');
            field.addEventListener('click', clickField);
        })
    }, 2000)
};



btnStart.addEventListener("click", startGame);