document.addEventListener('DOMContentLoaded', function () {
    // =========================================================
    // Cadastro de Doador — Controle do Modal em 3 Etapas
    // =========================================================
    var openBtn   = document.getElementById('btn-open-cadastro-doador');
    var overlay   = document.getElementById('cadastro-doador-overlay');
    var closeBtn  = document.getElementById('cd-close-modal');
    var backBtn   = document.getElementById('cd-btn-voltar');
    var nextBtn   = document.getElementById('cd-btn-avancar');
    var modal     = overlay ? overlay.querySelector('.cd-modal') : null;
    var navbar    = document.querySelector('.navbar');

    if (!overlay) return;

    var currentStep = 1;
    var totalSteps = 3;

    // Ajusta o topo do modal com base na altura real da navbar
    function updateNavbarOffset() {
        if (!navbar) return;
        var h = navbar.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--cd-navbar-h', h + 'px');
    }

    updateNavbarOffset();
    window.addEventListener('resize', updateNavbarOffset);

    // Atualiza a exibição da etapa atual e os botões do footer
    function updateStepView() {
        var steps = overlay.querySelectorAll('.cd-step');
        steps.forEach(function (stepEl) {
            var stepNumber = parseInt(stepEl.getAttribute('data-step'), 10);
            if (stepNumber === currentStep) {
                stepEl.classList.add('cd-step-active');
            } else {
                stepEl.classList.remove('cd-step-active');
            }
        });

        // Botão Voltar / Cancelar
        if (currentStep === 1) {
            backBtn.innerText = 'Cancelar';
        } else {
            backBtn.innerText = 'Voltar';
        }

        // Botão Avançar / Concluir
        if (currentStep === totalSteps) {
            nextBtn.innerText = 'Concluir';
        } else {
            nextBtn.innerText = 'Avançar';
        }
    }

    function openModal(e) {
        if (e) e.preventDefault();
        currentStep = 1;
        updateStepView();
        updateNavbarOffset();
        overlay.classList.remove('hidden');
        void overlay.offsetWidth; // Força reflow para transição CSS
        overlay.classList.add('cd-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(e) {
        if (e) e.preventDefault();
        overlay.classList.remove('cd-open');
        document.body.style.overflow = '';
        setTimeout(function () {
            overlay.classList.add('hidden');
        }, 180);
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Botão de voltar/cancelar
    backBtn.addEventListener('click', function (e) {
        if (currentStep > 1) {
            e.preventDefault();
            currentStep--;
            updateStepView();
        } else {
            closeModal(e);
        }
    });

    // Fecha ao clicar fora da modal
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('cd-open')) {
            closeModal();
        }
    });

    // Seleção visual de Tipo Sanguíneo (Etapa 3)
    var bloodBtns = overlay.querySelectorAll('.cd-blood-btn');
    var bloodInput = document.getElementById('cd-tipo-sanguineo');
    bloodBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            bloodBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            if (bloodInput) bloodInput.value = btn.getAttribute('data-blood');
        });
    });

    // Validação de campos obrigatórios antes de avançar de etapa
    if (nextBtn && modal) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();

            var activeStepEl = modal.querySelector('.cd-step[data-step="' + currentStep + '"]');
            var requiredFields = activeStepEl ? activeStepEl.querySelectorAll('[data-required="true"]') : [];
            var isValid = true;

            requiredFields.forEach(function (field) {
                if (!field.value || field.value.trim() === '') {
                    field.classList.add('cd-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('cd-invalid');
                }
            });

            if (isValid) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStepView();
                } else {
                    console.log('Cadastro do doador enviado com sucesso!');
                    closeModal();
                }
            }
        });

        // Limpa a borda vermelha ao digitar no campo
        modal.querySelectorAll('[data-required="true"]').forEach(function (field) {
            field.addEventListener('input', function () { field.classList.remove('cd-invalid'); });
            field.addEventListener('change', function () { field.classList.remove('cd-invalid'); });
        });
    }
});