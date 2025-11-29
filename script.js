
document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("langToggle");
    let currentLang = "PL";

    const texts = {
        PL: { 
            title: "Wiedźmińska Akademia – Jak działają sieci neuronowe?",
            description: "Sieć neuronowa to grupa powiązanych „neuronów”, które uczą się na podstawie doświadczeń. Zupełnie jak wiedźmin – każde zlecenie daje mu nową wiedzę i refleksy.",
            explanation: "Sygnał przepływa przez warstwę wejściową, potem przez ukryte warstwy, aż do wyjścia – jak informacje, które wiedźmin łączy przed walką.",
            footer: " Daniel Trzeciński – Wiedźmiński Świt ⚔️",
            bestiaryTitle: "Bestiariusz Sztucznej Inteligencji",
            dropoutDesc: "Losowy potwór zjadający część neuronów, aby sieć stała się silniejsza.",
            overfittingDesc: "Stwór, który uczy się wszystkiego na pamięć i potem głupieje przy nowych zadaniach.",
            backpropDesc: "Magiczny rytuał wysyłania błędu wstecz, aby poprawić decyzje.",
            activationDesc: {
                relu: "ReLU – standardowa funkcja aktywacji, zwiększa dynamikę sygnałów.",
                sigmoid: "Sigmoid – wygładza wartości między 0 a 1.",
                tanh: "Tanh – wartości między -1 a 1, przyjemny efekt wizualny.",
                linear: "Linear – prosty przepływ sygnału, nic nie zmienia."
            },
            button: "EN"
        },
        EN: {
            title: "Witcher Academy – How do neural networks work?",
            description: "A neural network is a group of connected neurons that learn from experience. Just like a witcher – every contract teaches him something new.",
            explanation: "The signal flows through the input layer, then hidden layers, to the output – like a witcher combining clues before battle.",
            footer: "Daniel Trzeciński – The Witcher Dawn ⚔️",
            bestiaryTitle: "Bestiary of Artificial Intelligence",
            dropoutDesc: "A random monster that eats neurons so the network becomes stronger.",
            overfittingDesc: "A beast that memorizes everything and fails at new tasks.",
            backpropDesc: "A magical ritual sending the error backwards to improve decisions.",
            activationDesc: {
                relu: "ReLU – standard activation, makes signals stronger.",
                sigmoid: "Sigmoid – smooths values between 0 and 1.",
                tanh: "Tanh – values between -1 and 1, nice visual effect.",
                linear: "Linear – simple flow, no changes."
            },
            button: "PL"
        }
    };

    const activationSelect = document.getElementById("activationSelect");
    const activationDescEl = document.getElementById("activationDesc");
    const trainBtn = document.getElementById("trainBtn");
    const trainingOutput = document.getElementById("trainingOutput");

    const canvas = document.getElementById("signalCanvas");
    const ctx = canvas.getContext("2d");
    const neurons = document.querySelectorAll(".neuron");
    const positions = [];

    function updatePositions() {
        positions.length = 0;
        const canvasRect = canvas.getBoundingClientRect();
        neurons.forEach(neuron => {
            const rect = neuron.getBoundingClientRect();
            positions.push({
                x: rect.left - canvasRect.left + rect.width / 2,
                y: rect.top - canvasRect.top + rect.height / 2
            });
        });
    }
    updatePositions();
    window.addEventListener("resize", updatePositions);

    function updateLanguage() {
        const t = texts[currentLang];
        document.getElementById("title").textContent = t.title;
        document.getElementById("description").textContent = t.description;
        document.getElementById("explanation").textContent = t.explanation;
        document.getElementById("footerText").textContent = t.footer;
        document.getElementById("bestiaryTitle").textContent = t.bestiaryTitle;
        document.getElementById("dropoutDesc").textContent = t.dropoutDesc;
        document.getElementById("overfittingDesc").textContent = t.overfittingDesc;
        document.getElementById("backpropDesc").textContent = t.backpropDesc;

        updateActivationDesc();
        langToggle.textContent = t.button;
    }

    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "PL" ? "EN" : "PL";
        updateLanguage();
    });

    function updateActivationDesc() {
        const mode = activationSelect.value;
        activationDescEl.textContent = texts[currentLang].activationDesc[mode];

        switch(mode) {
            case "relu": ctx.strokeStyle = "#e6d7c3"; break;
            case "sigmoid": ctx.strokeStyle = "#9bc9ff"; break;
            case "tanh": ctx.strokeStyle = "#ff9b9b"; break;
            case "linear": ctx.strokeStyle = "#b0ffb7"; break;
            default: ctx.strokeStyle = "#8a6f42";
        }
    }
    activationSelect.addEventListener("change", updateActivationDesc);

    trainBtn.addEventListener("click", () => {
        trainingOutput.innerHTML = "";
        const steps = currentLang === "PL"
            ? ["Zbieranie danych...", "Obliczanie błędu...", "Backpropagation...", "Aktualizacja wag...", "Trening zakończony!"]
            : ["Gathering data...", "Calculating error...", "Backpropagation...", "Updating weights...", "Training complete!"];
        let i = 0;
        const interval = setInterval(() => {
            const p = document.createElement("p");
            p.textContent = steps[i];
            trainingOutput.appendChild(p);
            i++;
            if(i >= steps.length) clearInterval(interval);
        }, 700);
    });

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.lineWidth = 3;
        for(let i=0;i<positions.length-1;i++){
            const p1 = positions[i], p2 = positions[i+1];
            const progress = (Math.sin(Date.now()/300 + i)+1)/2;
            ctx.beginPath();
            ctx.moveTo(p1.x,p1.y);
            ctx.lineTo(p1.x + (p2.x-p1.x)*progress, p1.y + (p2.y-p1.y)*progress);
            ctx.stroke();
        }
        requestAnimationFrame(animate);
    }
    animate();
    updateLanguage();
});



