const DATA = [
    {
        questions: 'Что такое JavaScrpit?',
        answers: [
            {
                id: '1',
                value: 'Язык описания внешнего вида документа.',
                correct: false,

            },
            {
                id: '2',
                value: 'Мультипарадигменный язык программирования.',
                correct: true,
            },
            {
                id: '3',
                value: 'Язык разметки, который используется для структурирования и отображения веб-страницы и её контента.',
                correct: false,
            },
        ]

    },
    {
        questions: 'Какие значения можно хранить в переменных?',
        answers: [
            {
                id: '4',
                value: 'Только числа и строки',
                correct: false,
            },
            {
                id: '5',
                value: 'Строки, числа с точкой, простые числа и булевые выражения',
                correct: true,
                
            },
        ]

    },
    {
        questions: 'Какая переменная записана неверно?',
        answers: [
            {
                id: '6',
                value: 'var num = 0;',
                correct: false,
            },
            {
                id: '7',
                value: 'var string = "1";',
                correct: false,
            },
            {
                id: '8',
                value: 'var isDone = true',
                correct: true,
            },
            {
                id: '9',
                value: 'var string = "string";',
                correct: false,
            },
        ]

    },
    {
        questions: 'В чем отличие между локальной и глобальной переменной?',
        answers: [
            {
                id: '10',
                value: 'Глобальные можно переопределять, локальные нельзя',
                correct: false,
            },
            {
                id: '11',
                value: 'Локальные видны повсюду, глобальные только в функциях',
                correct: false,
            },
            {
                id: '12',
                value: 'Глобальные видны повсюду, локальные только в функциях',
                correct: true,
            },
        ]

    },
    {
        questions: 'Какие функции выполняет JS?',
        answers: [
            {
                id: '13',
                value: 'Создает стилевое оформление сайта',
                correct: false,
            },
            {
                id: '14',
                value: 'Отвечает за функции на стороне клиента',
                correct: true,
            },
        ]

    },
    {
        questions: 'Выберите неверный ответ',
        answers: [
            {
                id: '15',
                value: 'Для добавления кода JavaScript на страницу используется include.',
                correct: true,
            },
            {
                id: '16',
                value: 'Для добавления кода JavaScript на страницу используется тег <script>.',
                correct: false,
            },
            {
                id: '17',
                value: 'Скрипт во внешнем файле можно вставить с помощью <script src="path/to/script.js"></script>.',
                correct: false,
            },
        ]

    },
    {
        questions: 'Где верно указано имя переменной?',
        answers: [
            {
                id: '18',
                value: 'var 2num;',
                correct: false,
            },
            {
                id: '19',
                value: 'ver num;',
                correct: false,
            },
            {
                id: '20',
                value: 'var num_1;',
                correct: true,
            },
            {
                id: '21',
                value: 'var num',
                correct: false,
            },
        ]

    },
    {
        questions: 'Что такое переменная?',
        answers: [
            {
                id: '22',
                value: 'Коробка в которую кладут вещи.',
                correct: false,
            },
            {
                id: '23',
                value: 'Переменная – это «именованное хранилище» для данных. Мы можем использовать переменные для хранения товаров, посетителей и других данных.',
                correct: true,
            },
            {
                id: '24',
                value: 'Характеристика набора данных.',
                correct: false,
            },
        ]

    },
    {
        questions: 'Сколько основных типов данных в JS?',
        answers: [
            {
                id: '25',
                value: '3',
                correct: false,
            },
            {
                id: '26',
                value: '7',
                correct: false,
            },
            {
                id: '27',
                value: '8',
                correct: true,
            },
            {
                id: '28',
                value: '9',
                correct: false,
            },
        ]

    },
    {
        questions: 'Тип symbol (символ) используется для ...?',
        answers: [
            {
                id: '29',
                value: 'создания уникальных идентификаторов в объектах.',
                correct: true,
            },
            {
                id: '30',
                value: 'создания символов.',
                correct: false,
            },
            {
                id: '31',
                value: 'создания целочисленного значения.',
                correct: false,
            },
        ]

    },
];

let storageResults = {

};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const validQuestions = document.getElementById('validQuestions');

const renderQuestions = (index) => {
    renderIndicator(index + 1);
    
    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers.map((answer) => `
        <li>
            <label>
                <input class="answer-input" type="radio" name="${index}" value=${answer.id}>
                ${answer.value}
            </label>
        </li>          
    `).join('');


    questions.innerHTML = `
        <div class="quiz-questions-item">
        <div class="quiz-questions-item_question">${DATA[index].questions}</div>
            <ul class="quiz-questions-item_answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';
    var validQuestion = 0;

    

    const getClassName = (answer, questionIndex) => {
        let className = '';
        
        if(!answer.correct && answer.id === storageResults[questionIndex]){
            className = 'answer--invalid';
            validQuestion--;
        }
        else if (answer.correct){
            className = 'answer--valid';
            validQuestion++;
        }


        validQuestions.innerHTML = `Верных ответов ${validQuestion}`;
        return className;
    }

    const getAnswers = (questionIndex) => DATA[questionIndex].answers.map((answer) => 
    `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`).join('');

    DATA.forEach((questions, index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item_question">${questions.questions}</div>
                <ul class="quiz-results-item_answers">${getAnswers(index)}</ul>
            </div>
        `;
    });

    

    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};



quiz.addEventListener('change', (event) => {
    if(event.target.classList.contains('answer-input')){
        storageResults[event.target.name] = event.target.value;
        btnNext.style.backgroundColor = "#4CAF50";
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
        
        if(DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible'); 
            btnNext.classList.add('btn-next--hidden'); 
            btnRestart.classList.add('btn-restart--visible');
            validQuestions.classList.remove('validQuestions--hidden');
            validQuestions.classList.add('validQuestions--visible');
            renderResults();
        }
        else{
            renderQuestions(nextQuestionIndex);  
        }
        btnNext.style.backgroundColor = "grey";
        btnNext.disabled = true;
    }
    if(event.target.classList.contains('btn-restart')){
        results.innerHTML = "";
        storageResults = {};

        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible'); 
        btnNext.classList.remove('btn-next--hidden'); 
        btnRestart.classList.remove('btn-restart--visible');
        validQuestions.classList.remove('validQuestions--visible');
        validQuestions.classList.add('validQuestions--hidden');
        renderQuestions(0);
    }
});

renderQuestions(0);