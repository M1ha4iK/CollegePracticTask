const DATA = [
    {
        questions: 'Что такое CSS?',
        answers: [
            {
                id: '1',
                value: 'Язык разметки, который используется для структурирования и отображения веб-страницы и её контента.',
                correct: false,
            },
            {
                id: '2',
                value: 'Скриптовый язык программирования.',
                correct: false,
            },
            {
                id: '3',
                value: 'Язык описания внешнего вида документа.',
                correct: true,
            },
        ]

    },
    {
        questions: 'Возможно ли выбрать несколько элементов разного типа и применить единый набор правил для всех из них?',
        answers: [
            {
                id: '4',
                value: 'Нет',
                correct: false,
            },
            {
                id: '5',
                value: 'Да, через запятую',
                correct: true,
                
            },
        ]

    },
    {
        questions: 'Какой селектор существует?',
        answers: [
            {
                id: '6',
                value: 'Селектор блока',
                correct: false,
            },
            {
                id: '7',
                value: 'Селектор шрифта',
                correct: false,
            },
            {
                id: '8',
                value: 'ID селектор',
                correct: true,
            },
            {
                id: '9',
                value: 'Главный селектор',
                correct: false,
            },
        ]

    },
    {
        questions: 'Выберите селектор элемента',
        answers: [
            {
                id: '10',
                value: '#my-id',
                correct: false,
            },
            {
                id: '11',
                value: 'p',
                correct: true,
            },
            {
                id: '12',
                value: '.my-class',
                correct: false,
            },
        ]

    },
    {
        questions: 'Выберите верный вариант ответа?',
        answers: [
            {
                id: '13',
                value: 'padding, пространство вокруг контента и внешней стороны элемента',
                correct: false,
            },
            {
                id: '14',
                value: 'margin, пространство вокруг внешней стороны элемента',
                correct: true,
            },
        ]

    },
    {
        questions: 'Как изменить цвет заднего фона страницы?',
        answers: [
            {
                id: '15',
                value: 'background-color: //цвет',
                correct: true,
            },
            {
                id: '16',
                value: 'color: //цвет',
                correct: false,
            },
            {
                id: '17',
                value: 'backcolor: //цвет',
                correct: false,
            },
        ]

    },
    {
        questions: 'Что делает border?',
        answers: [
            {
                id: '18',
                value: 'Устанавливает внтренний отступ',
                correct: false,
            },
            {
                id: '19',
                value: 'Устанавливает внешний отступ',
                correct: false,
            },
            {
                id: '20',
                value: 'Просто устанавливает сплошную чёрную рамку',
                correct: true,
            },
            {
                id: '21',
                value: 'Устанавливает ширину рамки',
                correct: false,
            },
        ]

    },
    {
        questions: 'Что такое селектор?',
        answers: [
            {
                id: '22',
                value: 'Имя HTML-элемента в начале набора правил.',
                correct: true,
            },
            {
                id: '23',
                value: 'Способы, которыми вы можете стилизовать определённый HTML-элемент',
                correct: false,
            },
            {
                id: '24',
                value: 'Возможность выбора секции для стилизации',
                correct: false,
            },
        ]

    },
    {
        questions: 'Как с помощью стилей, сделать текст жирным?',
        answers: [
            {
                id: '25',
                value: 'font-weight://выбор толщины',
                correct: true,
            },
            {
                id: '26',
                value: 'font-size://выбор толщины',
                correct: false,
            },
            {
                id: '27',
                value: 'font-family://выбор толщины',
                correct: false,
            },
            {
                id: '28',
                value: 'font-style://выбор толщины',
                correct: false,
            },
        ]

    },
    {
        questions: 'Как добавить цвет фона для всех элементов h2?',
        answers: [
            {
                id: '29',
                value: 'h2 {background-color:#FFFFFF;}',
                correct: true,
            },
            {
                id: '30',
                value: 'all.h2 {background-color:#FFFFFF;}',
                correct: false,
            },
            {
                id: '31',
                value: 'h2.all {background-color:#FFFFFF;}',
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