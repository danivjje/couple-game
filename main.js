(() => {
    const numbers = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
    const wrapper = document.createElement('div');
    wrapper.classList.add('card-wrapper');
    const button = createButton();
    const arrayWithCardsText = [];
    const arrayWithCards = [];
    const arrayCounter = [];
    const moreArrays = [];

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

        timer.textContent = '60';
        const countTimer = setInterval(() => {
            --counter;
            timer.textContent = counter;
            if (counter <= 0) {
                clearInterval(countTimer);
            }
        }, 1000);

        for (let i = 0; i < (numbers.length); ++i) {
            const card = document.createElement('button');
            wrapper.append(card);
            card.classList.add('card');
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
                if (card.textContent != '') {
                    moreArrays.push(card);
                }
                if (arrayWithCardsText.length == 2) {
                    arrayWithCardsText.length = 0;
                    arrayCounter.push(true);
                }
                if (arrayCounter.length == 8) {
                    wrapper.append(button);
                    clearInterval(countTimer);
                    button.addEventListener('click', () => {
                        for (const value of moreArrays) {
                            value.textContent = '';
                            value.removeAttribute('disabled');
                        }
                    });
                }
            });
        }
        button.addEventListener('click', () => {
            button.remove();
            arrayCounter.length = 0;
            counter = 60;
            setInterval(() => {
                --counter;
                timer.textContent = counter;
                if (counter <= 0) {
                    clearInterval(countTimer);
                }
            }, 1000)
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
        createdButton.innerHTML = 'Congratulations! Retry?';
        createdButton.classList.add('btn');
        return createdButton;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.append(wrapper);
        shuffleNumbers(numbers);
        createCards();
        document.body.prepend(timer);
    });
})();