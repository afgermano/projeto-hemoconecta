 const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.navbar-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const track = document.querySelector('.carousel-track');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        let index = 0;
        const cardWidth = 236; // largura do card + gap

        nextBtn.addEventListener('click', () => {
            if (index < track.children.length - 1) {
            index++;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
            index--;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
            }
        });

    const patientCards = document.querySelectorAll(".patient-card");
        const modalOverlay = document.getElementById("modal-overlay");
        const closeModalBtn = document.getElementById("close-modal");

        const modalName = document.getElementById("modal-name");
        const modalBlood = document.getElementById("modal-blood");
        const modalCity = document.getElementById("modal-city");
        const modalNotes = document.getElementById("modal-notes");
        const modalPrioridade = document.getElementById("modal-prioridade");

        patientCards.forEach(card => {
        card.addEventListener("click", () => {
            modalName.textContent = card.dataset.name;
            modalBlood.textContent = `Tipo sanguíneo: ${card.dataset.blood}`;
            modalCity.textContent = `Cidade: ${card.dataset.city}`;
            modalNotes.textContent = `Observações: ${card.dataset.notes}`;
            modalPrioridade.textContent = `Prioridade: ${card.dataset.prioridade}`;

            modalOverlay.classList.remove("hidden");
        });
        });

        closeModalBtn.addEventListener("click", () => {
        modalOverlay.classList.add("hidden");
        });

        modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add("hidden");
        }
        });