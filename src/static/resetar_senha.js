// validação de senhas iguais antes do POST
document.querySelector('form').addEventListener('submit', e => {
    const n = document.querySelector('input[name="new_password"]').value;
    const c = document.querySelector('input[name="confirm_password"]').value;
    if (!n || n !== c) {
      e.preventDefault();
      alert('As senhas devem coincidir.');
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  // Animação de entrada da caixa reset
  const resetContainer = document.querySelector('.reset-container');
  if (resetContainer) {
    resetContainer.classList.remove('show', 'hide');
    resetContainer.style.opacity = "";
    resetContainer.style.transform = "";
    setTimeout(() => {
      resetContainer.classList.add('show');
    }, 100);
  }

  // Alternar visibilidade dos campos de senha igual ao login
  document.querySelectorAll('.reset-password-container').forEach(function(container) {
    const input = container.querySelector('.reset-password');
    const btn = container.querySelector('.reset-toggle-password');
    if (input && btn) {
      // Estado inicial
      btn.dataset.visible = "false";
      btn.style.backgroundImage = 'url(/static/img/olhoa.png)';
      btn.style.backgroundRepeat = 'no-repeat';
      btn.style.backgroundPosition = 'center';
      btn.style.backgroundSize = '26px 26px';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.width = '32px';
      btn.style.height = '32px';
      btn.style.padding = '0';

      btn.addEventListener('click', function() {
        const isVisible = btn.dataset.visible === "true";
        if (isVisible) {
          input.type = "password";
          btn.style.backgroundImage = 'url(/static/img/olhoa.png)';
          btn.dataset.visible = "false";
        } else {
          input.type = "text";
          btn.style.backgroundImage = 'url(/static/img/olhof.png)';
          btn.dataset.visible = "true";
        }
      });
    }
  });

  // Validação de senhas iguais antes do POST
  const form = document.querySelector('.reset-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const n = document.getElementById('reset-password').value;
      const c = document.getElementById('reset-password-confirm').value;
      if (!n || n !== c) {
        e.preventDefault();
        alert('As senhas devem coincidir.');
      }
    });
  }
});