const API_URL = "http://localhost:9999/events";

window.onload = () => {
    loadEvents();
};

// LOAD EVENTS
function loadEvents() {

    fetch(API_URL)
        .then(response => response.json())
        .then(events => {

            const eventList = document.getElementById("eventList");
            eventList.innerHTML = "";

            events.forEach(event => {

                eventList.innerHTML += `
                    <div class="event-card">
                        <h3>${event.eventName}</h3>
                        <p>📅 ${event.eventDate}</p>
                        <p>📍 ${event.location}</p>

                        <button class="delete-btn"
                                onclick="deleteEvent(${event.id})">
                            Delete
                        </button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Load Error:", error);
        });
}

// ADD EVENT
function addEvent() {

    const eventName = document.getElementById("eventName").value.trim();
    const eventDate = document.getElementById("eventDate").value;
    const location = document.getElementById("location").value.trim();

    if (!eventName || !eventDate || !location) {
        alert("Please fill all fields");
        return;
    }

    const event = {
        eventName,
        eventDate,
        location
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Add Failed");
        }

        document.getElementById("eventName").value = "";
        document.getElementById("eventDate").value = "";
        document.getElementById("location").value = "";

        loadEvents();

        alert("Event Added ✅");
    })
    .catch(error => {
        console.error(error);
        alert("Failed to add event ❌");
    });
}

// DELETE EVENT
function deleteEvent(id) {

    if (!confirm("Are you sure you want to delete this event?")) {
        return;
    }

    fetch(`http://localhost:9999/events/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`Delete Failed : ${response.status}`);
        }

        alert("Event Deleted ✅");

        loadEvents();
    })
    .catch(error => {
        console.error(error);
        alert("Delete Failed ❌");
    });
}