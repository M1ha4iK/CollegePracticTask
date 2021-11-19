const DATA = [
    {
        questions: 'Что такое HTML?',
        answers: [
            {
                id: '1',
                value: 'Высокоуровневый язык программирования.',
                correct: false,
            },
            {
                id: '2',
                value: 'Ключевое слово, относящееся к части информации.',
                correct: false,
            },
            {
                id: '3',
                value: 'Язык разметки, который используется для структурирования и отображения веб-страницы и её контента.',
                correct: true,
            },
        ]

    },
    {
        questions: 'Возможно ли распологать элементы внутри других элементов?',
        answers: [
            {
                id: '4',
                value: 'Да',
                correct: true,
            },
            {
                id: '5',
                value: 'Нет',
                correct: false,
            },
        ]

    },
    {
        questions: 'Как правильно?',
        answers: [
            {
                id: '6',
                value: '&lt;p&gt;Я хочу собачку!',
                correct: false,
            },
            {
                id: '7',
                value: '&ltp&gt;Я хочу собачку!&lt/p&gt;',
                correct: true,
            },
            {
                id: '8',
                value: '&lt/p&gt;Я хочу собачку!&ltp/&gt;',
                correct: false,
            },
            {
                id: '9',
                value: '&lt/p&gt;Я хочу собачку!&lt/p&gt;',
                correct: false,
            },
        ]

    },
    {
        questions: 'Атрибут всегда должен иметь:',
        answers: [
            {
                id: '10',
                value: 'Имя атрибута, за которым следует знак равенства.',
                correct: true,
            },
            {
                id: '11',
                value: 'Название атрибута обязательно должно начинаться с большой буквы.',
                correct: false,
            },
            {
                id: '12',
                value: 'Термоядерный реактор.',
                correct: false,
            },
        ]

    },
    {
        questions: 'Бывают ли пустые элементы в HTML?',
        answers: [
            {
                id: '13',
                value: 'Нет',
                correct: false,
            },
            {
                id: '14',
                value: 'Да',
                correct: true,
            },
        ]

    },
    {
        questions: 'Какого уровня заголовков НЕ существует?',
        answers: [
            {
                id: '15',
                value: '&lth1&gt;',
                correct: false,
            },
            {
                id: '16',
                value: '&lth0&gt;',
                correct: true,
            },
            {
                id: '17',
                value: '&lth6&gt;',
                correct: false,
            },
        ]

    },
    {
        questions: 'Какой тег предназначен для абзацев?',
        answers: [
            {
                id: '18',
                value: '&lta&gt;&lt/a&gt;',
                correct: false,
            },
            {
                id: '19',
                value: '&lts&gt;&lt/s&gt;',
                correct: false,
            },
            {
                id: '20',
                value: '&ltp&gt;&lt/p&gt;',
                correct: true,
            },
            {
                id: '21',
                value: '&ltbr&gt;&lt/br&gt;',
                correct: false,
            },
        ]

    },
    {
        questions: 'Как добавить ссылку?',
        answers: [
            {
                id: '22',
                value: '&lta href="..."&gt;Ссылка&lt/a&gt;',
                correct: true,
            },
            {
                id: '23',
                value: '&ltlink href="..."&gt;Ссылка&lt/a&gt;',
                correct: false,
            },
            {
                id: '24',
                value: '&ltlink&gt;Ссылка&lt/link&gt;',
                correct: false,
            },
        ]

    },
    {
        questions: 'С помощью какого тега можно сделать текст жирным?',
        answers: [
            {
                id: '25',
                value: '&lth1&gt;',
                correct: false,
            },
            {
                id: '26',
                value: '&lti&gt;',
                correct: false,
            },
            {
                id: '27',
                value: '&ltstring&gt;',
                correct: false,
            },
            {
                id: '28',
                value: '&ltb&gt;',
                correct: true,
            },
        ]

    },
    {
        questions: 'Что такое семантический тег?*',
        answers: [
            {
                id: '29',
                value: 'Это тег, которые предназначен для того чтобы компьютерные программы (поисковые системы, сборщики информации, речевые браузеры и т. д.), понимали какой тип информации заложен в данном теге.',
                correct: true,
            },
            {
                id: '30',
                value: 'Значение единиц языка.',
                correct: false,
            },
            {
                id: '31',
                value: 'Это что-то из другой вселенной.',
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