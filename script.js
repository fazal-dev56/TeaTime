function updatePakistanTime() {
    const optionsTime = {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };

    const optionsDate = {
        timeZone: "Asia/Karachi",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const now = new Date();

    const timeString = now.toLocaleTimeString("en-PK", optionsTime);
    const dateString = now.toLocaleDateString("en-PK", optionsDate);

    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
}

async function updateIslamicDate() {
    try {
        const now = new Date();

        // Format date as DD-MM-YYYY for API
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        const response = await fetch(
            `https://api.aladhan.com/v1/gToH?date=${formattedDate}`
        );

        const data = await response.json();

        const hijri = data.data.hijri;

        const islamicDateFormatted = `${hijri.day} ${hijri.month.en}, ${hijri.year}`;

        document.getElementById("islamic-date").textContent =
            islamicDateFormatted;

    } catch (error) {
        document.getElementById("islamic-date").textContent =
            "Islamic date unavailable";
        console.error(error);
    }
}

updateIslamicDate();
updatePakistanTime();
setInterval(updatePakistanTime, 30000); // update every 30 seconds