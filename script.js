// ===== المان‌ها =====
const correctValueEl = document.getElementById('correctValue');
const wrongValueEl = document.getElementById('wrongValue');
const correctDisplay = document.getElementById('correctDisplay');
const wrongDisplay = document.getElementById('wrongDisplay');

const totalDisplay = document.getElementById('totalDisplay');
const correctInc = document.getElementById('correctIncrease');
const correctDec = document.getElementById('correctDecrease');
const wrongInc = document.getElementById('wrongIncrease');
const wrongDec = document.getElementById('wrongDecrease');
const resetBtn = document.getElementById('resetAll');
const percentDisplay = document.getElementById('percentDisplay')

// ===== مقدارها =====
let correct = 0;
let wrong = 0;
// ===== بارگذاری از LocalStorage =====
const savedCorrect = localStorage.getItem('testCounter_correct');
const savedWrong = localStorage.getItem('testCounter_wrong');

if (savedCorrect !== null) {
    correct = parseInt(savedCorrect);
} else {
    correct = 0;
}

if (savedWrong !== null) {
    wrong = parseInt(savedWrong);
} else {
    wrong = 0;
}

// ===== تابع به‌روزرسانی =====
function updateAll() {
    correctValueEl.textContent = correct;
    wrongValueEl.textContent = wrong;
    correctDisplay.textContent = correct;
    wrongDisplay.textContent = wrong;

    const total = correct + wrong;
    totalDisplay.textContent = total;
}
// ===== ذخیره در LocalStorage =====
localStorage.setItem('testCounter_correct', correct);
localStorage.setItem('testCounter_wrong', wrong);

function changeCorrect(amount) {
    correct = correct + amount;
    if (correct > 999) correct = 999;        // فقط بالا ۹۹۹
    updateAll();
}

function changeWrong(amount) {
    wrong = wrong + amount;
    if (wrong > 999) wrong = 999;            // فقط بالا ۹۹۹
    updateAll();
}

// ===== رویدادهای کلیک =====
correctInc.addEventListener('click', () => changeCorrect(1));
correctDec.addEventListener('click', () => changeCorrect(-1));

wrongInc.addEventListener('click', () => changeWrong(1));
wrongDec.addEventListener('click', () => changeWrong(-1));

resetBtn.addEventListener('click', () => {
    if (confirm('Reset everything?')) {
        correct = 0;
        wrong = 0;
        updateAll();
        // ===== پاک کردن LocalStorage =====
        localStorage.removeItem('testCounter_correct');
        localStorage.removeItem('testCounter_wrong');
    }
});

// ===== کنترل با کیبورد =====
document.addEventListener('keydown', (e) => {
    // فلش بالا = درست +۱
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        changeCorrect(1);
    }
    // فلش پایین = غلط +۱
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        changeWrong(1);
    }
    // کلید R = ریست
    else if (e.key === 'r' || e.key === 'R') {
        if (confirm('همه رو ریست کنم؟')) {
            correct = 0;
            wrong = 0;
            updateAll();
        }
    }
});

// ===== شروع =====
function updateAll() {
    correctValueEl.textContent = correct;
    wrongValueEl.textContent = wrong;
    correctDisplay.textContent = correct;
    wrongDisplay.textContent = wrong;

    const total = correct + wrong;
    totalDisplay.textContent = total;

    let percent = 0;
    if (total > 0) {
        percent = Math.round((correct / total) * 100);
    }
    percentDisplay.textContent = percent;

    localStorage.setItem('testCounter_correct', correct);
    localStorage.setItem('testCounter_wrong', wrong);
}
// ===== Save Result =====
document.getElementById('saveResult').addEventListener('click', function () {
    const total = correct + wrong;

    // ===== محاسبه درصد =====
    let percent = 0;
    if (total > 0) {
        percent = Math.round((correct / total) * 100);
    }

    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString('en-US');

    const result =
        `🧮 Test Result:
✅ Correct: ${correct}
❌ Wrong: ${wrong}
📑 Total: ${total}
📊 Percentage: ${percent}%
📅 Date: ${date}
⏱️ Time: ${time}`;

    alert(result);
});