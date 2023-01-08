(() => {
    const numbers = [];
    const wrapper = document.createElement('div');
    const button = createButton();
    const changeButton = createChangeButton();
    wrapper.classList.add('card-wrapper');

    const arrayWithCardsText = [];
    const arrayWithCards = [];
    const arrayCounter = [];

    let reriteHorizontal;

    const timer = createTimer().createTimer;
    let counter = createTimer().counter;

    let shuffleNumbers = function (arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let tmp = arr[i];
            let random = Math.floor(Math.random() * (i + 1));

            arr[i] = arr[random];
            arr[random] = tmp;
        }
        return arr;
    };

    function createCards() {

        for (let i = 0; i < (numbers.length); ++i) {

            const card = document.createElement('button');
            wrapper.append(card);
            card.classList.add('card');
            card.style.flexBasis = `${100 / reriteHorizontal - 1}%`;

            const countTimer = setInterval(() => {
                counter -= 1 / numbers.length;
                timer.textContent = Math.ceil(counter);
                if (counter <= 0) {
                    wrapper.append(button);
                    clearInterval(countTimer);
                    card.setAttribute('disabled', 'disabled');
                }
                if (arrayCounter.length == numbers.length / 2) {
                    clearInterval(countTimer);
                }
            }, 1000);

            card.addEventListener('click', (elem) => {
                card.textContent = numbers[i];
                arrayWithCardsText.push(elem.target.textContent);
                arrayWithCards.push(elem.target);
                card.setAttribute('disabled', 'disabled');
                if (arrayWithCardsText.length > 1) {
                    if (arrayWithCardsText[arrayWithCardsText.length - 2] != arrayWithCardsText[arrayWithCardsText.length - 1]) {
                        card.textContent = '';
                        card.removeAttribute('disabled');
                        arrayWithCards[arrayWithCards.length - 2].textContent = '';
                        arrayWithCards[arrayWithCards.length - 2].removeAttribute('disabled');
                        arrayWithCardsText.length = 0;
                        arrayWithCards.length = 0;
                    }
                }
                if (arrayWithCardsText.length == 2) {
                    arrayWithCardsText.length = 0;
                    arrayCounter.push(true);
                }
                if (arrayCounter.length == numbers.length / 2) {
                    wrapper.append(button);
                    wrapper.append(changeButton);
                    clearInterval(countTimer);
                }
            });
            button.addEventListener('click', () => {
                card.removeAttribute('disabled');
                card.textContent = '';
                button.remove();
                arrayCounter.length = 0;
                counter = 60;
                shuffleNumbers(numbers);
                const counterTimer = setInterval(() => {
                    counter -= 1 / numbers.length;
                    timer.textContent = Math.ceil(counter);
                    if (counter <= 0) {
                        wrapper.append(button);
                        clearInterval(counterTimer);
                        card.setAttribute('disabled', 'disabled');
                    }
                    if (arrayCounter.length == numbers.length / 2) {
                        clearInterval(counterTimer);
                    }
                }, 1000);
            });
            changeButton.addEventListener('click', () => {
                card.removeAttribute('disabled');
                card.textContent = '';
                card.remove();
            });
        }
        changeButton.addEventListener('click', () => {
            location.reload();
        });
    }

    function createTimer() {
        let counter = 60;
        const createTimer = document.createElement('div');
        createTimer.classList.add('timer');
        return {
            createTimer,
            counter
        };
    }

    function createButton() {
        const createdButton = document.createElement('button');
        createdButton.innerHTML = 'Retry?';
        createdButton.classList.add('btn');
        return createdButton;
    }

    function createChangeButton() {
        const changeButton = document.createElement('button');
        changeButton.innerHTML = 'Change numbers?';
        changeButton.classList.add('change-button');
        return changeButton;
    }

    function createForm() {
        const form = document.createElement('form');
        form.classList.add('form');
        const formButton = document.createElement('button');
        formButton.classList.add('form__button');
        formButton.textContent = 'start the game';
        const formWrapper = document.createElement('div');
        formWrapper.classList.add('form__wrapper');
        const horizontalInput = document.createElement('input');
        horizontalInput.classList.add('form__input');
        horizontalInput.setAttribute('placeholder', 'enter a number of horizontal cards');
        horizontalInput.setAttribute('required', 'required');
        const verticalInput = document.createElement('input');
        verticalInput.classList.add('form__input');
        verticalInput.setAttribute('placeholder', 'enter a number of vertical cards');
        verticalInput.setAttribute('required', 'required');
        const h1 = document.createElement('h1');
        h1.classList.add('form__title');
        h1.textContent = 'Числа должны быть чётными, не меньше 2 и не больше 10 (включительно)';
        return {
            form,
            formButton,
            formWrapper,
            horizontalInput,
            verticalInput,
            h1
        };
    }

    function loadForm() {
        const form = createForm().form;
        const formButton = createForm().formButton;
        const formWrapper = createForm().formWrapper;
        const horizontalInput = createForm().horizontalInput;
        const verticalInput = createForm().verticalInput;
        const h1 = createForm().h1;
        document.body.append(formWrapper);
        formWrapper.append(form);
        form.append(horizontalInput, verticalInput, formButton);
        form.prepend(h1);

        horizontalInput.value = '4';
        verticalInput.value = '4';

        formButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (horizontalInput.value >= 2 && horizontalInput.value <= 10 && horizontalInput.value % 2 == 0 &&
                verticalInput.value >= 2 && verticalInput.value <= 10 && verticalInput.value % 2 == 0) {
                reriteHorizontal = horizontalInput.value;
                const amountOfNumbers = (parseInt(horizontalInput.value) * parseInt(verticalInput.value)) / 2;
                for (let i = 0; i < 2; ++i) {
                    for (let i = 1; i <= amountOfNumbers; ++i) {
                        numbers.push(i);
                    }
                }
                formWrapper.remove();
                document.body.append(wrapper);
                shuffleNumbers(numbers);
                createCards();
                document.body.prepend(timer);
                counter = 60;
                timer.textContent = '60';
            }
            if (verticalInput.value % 2 == 1 || verticalInput.value > 10 || verticalInput.value < 2) {
                verticalInput.value = '4';
            }
            if (horizontalInput.value % 2 == 1 || horizontalInput.value < 2 || horizontalInput.value > 10) {
                horizontalInput.value = '4';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadForm();
    });
})();