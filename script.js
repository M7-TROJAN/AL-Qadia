// Helper function to calculate total days since the match
function calculateDaysSince(matchDate) {
    const today = new Date();
    const timeDifference = today.getTime() - matchDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
}

// Helper function to calculate the number of Fridays since the match
function calculateFridaysSince(matchDate) {
    let fridaysCount = 0;
    const today = new Date();
    let current = new Date(matchDate);

    // Loop through every day from the match date to today
    while (current <= today) {
        if (current.getDay() === 5) { // 5 represents Friday
            fridaysCount++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return fridaysCount;
}

// Helper function to calculate the time until the next anniversary
function calculateTimeUntilNextAnniversary(matchDate) {
    const today = new Date();
    
    // إنشاء تاريخ الذكرى السنوية القادمة لهذه السنة
    let nextAnniversary = new Date(today.getFullYear(), matchDate.getMonth(), matchDate.getDate());

    // إذا كانت الذكرى السنوية لهذه السنة قد مرت بالفعل، نضيف سنة
    if (today > nextAnniversary) {
        nextAnniversary.setFullYear(today.getFullYear() + 1);
    }

    // حساب الفرق بين اليوم وتاريخ الذكرى السنوية القادمة
    let years = nextAnniversary.getFullYear() - today.getFullYear();
    let months = nextAnniversary.getMonth() - today.getMonth();
    let days = nextAnniversary.getDate() - today.getDate();
    
    // إذا كان الفرق بالأيام أقل من 0، نطرح شهرًا ونضيف الأيام الفعلية للشهر السابق
    if (days < 0) {
        months -= 1;
        days += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    }

    // إذا كان الفرق بالأشهر أقل من 0، نطرح سنةً ونضيف 12 شهرًا
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // حساب الساعات المتبقية
    const timeDifference = nextAnniversary - today;
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
        years: years,
        months: months,
        days: days,
        hours: hours
    };
}

// Function to handle Typed.js effect
function startTypedEffect(elementId, text) {
    const options = {
        strings: [text],
        typeSpeed: 200,
        backSpeed: 200,
        backDelay: 2000,
        loop: true,
    };

    new Typed(elementId, options);
}

// Main function
function updateCounters() {
    const matchDate = new Date("2020-11-27"); // Match date

    const totalDays = calculateDaysSince(matchDate);
    const fridaysCount = calculateFridaysSince(matchDate);
    const timeUntilNextAnniversary = calculateTimeUntilNextAnniversary(matchDate);

    // Start Typed.js for counters
    startTypedEffect('#fridayCount', fridaysCount.toString());
    startTypedEffect('#dayCount', totalDays.toString());

    document.getElementById("nextAnniversary").textContent = `${timeUntilNextAnniversary.years} سنة، ${timeUntilNextAnniversary.months} شهر، ${timeUntilNextAnniversary.days} يوم، و ${timeUntilNextAnniversary.hours} ساعة`;
}

document.getElementById('playButton').addEventListener('click', function() {
    const audio = document.querySelector('audio');
    if (audio.paused) {
        audio.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
    }
});


// Call the function to update counters on page load
window.onload = function() {
    updateCounters();
};