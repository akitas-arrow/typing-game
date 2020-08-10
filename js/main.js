'use strict';

{
    const words = [
        'apple',
        'sky',
        'blue',
        'middle',
        'set',
        'music',
        'lunch',
        'balloon',
        'design',
        'summer',
        'car',
        'rabbit',
        'tea'
    ];

    let word;
    let loc;
    let score;
    let miss;
    // const timeLimit = 10 * 1000;
    let startTime;
    let isPlaying = false;
    let count;
    let timeLeft;

    const target = document.querySelector('#target');
    const scoreLabel = document.querySelector('#score');
    const missLabel = document.querySelector('#miss');
    const timerLabel = document.querySelector('#timer');
    const result = document.querySelector('#result');
    const resultMiss = document.querySelector('#result_miss');
    const resultAccuracy = document.querySelector('#result_accuracy');
    const resultTime = document.querySelector('#result_time');

    function updateTarget() {
        let placeholder ='';
        for (let i = 0; i< loc; i++) {
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);
    }

    
    function updateTimer() {
        // const timeLeft = startTime + timeLimit - Date.now();
        timeLeft = Date.now() - startTime;
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        const timeoutId = setTimeout(() => {
            updateTimer();
        },10);

        if (count === 10) {
            isPlaying = false;
            clearTimeout(timeoutId);
            // timerLabel.textContent = '0.00';
            setTimeout(() => {
                showResult();
            },100);

            // target.textContent = 'click to replay';
        }
        // if (timeLeft < 0) {
        //     isPlaying = false;
        //     clearTimeout(timeoutId);
        //     timerLabel.textContent = '0.00';
        //     setTimeout(() => {
        //         showResult();
        //     },100);

        //     target.textContent = 'click to replay';
        // }
    }

    function showResult() {
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        resultMiss.textContent = `ミス:${miss}回`;
        resultAccuracy.textContent = `正確率:${accuracy.toFixed(2)}%`;
        resultTime.textContent = `入力時間:${(timeLeft / 1000).toFixed(2)}秒`;
        result.classList.remove('hidden');
        // alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy ${(timeLeft / 1000).toFixed(2)}`);
    }
    

    window.addEventListener('click', () => {
        if (isPlaying === true) {
            return;
        }
        isPlaying = true;

        loc = 0;
        score = 0;
        miss = 0;
        count = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];

        target.textContent = word;
        startTime = Date.now();
        updateTimer();
    })

    function styleBackgroundRed() {
        document.querySelector('.container').style.backgroundColor = '#fff';
        setTimeout(styleBackgroundRed, 500);
    }

    window.addEventListener('keydown', e => {
        if (isPlaying !== true) {
            return;
        }
        console.log(e.key);
        if (e.key === word[loc]) {
            loc++;
            if (loc === word.length) {
                word = words[Math.floor(Math.random() * words.length)];
                count++
                loc = 0;
            }
            updateTarget();
            score++;
            scoreLabel.textContent = score;
        } else {
            styleBackgroundRed();
            document.querySelector('.container').style.backgroundColor = '#fff0f5';
            miss++;
            missLabel.textContent = miss;
        }
    });
}