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
  const btn = document.getElementById('btnNovaSenha');
  const sentBox = document.getElementById('sentResetBox');
  const novaSenhaBox = document.getElementById('novaSenhaBox');
  if (btn && sentBox && novaSenhaBox) {
    btn.addEventListener('click', function() {
      sentBox.classList.remove('show');
      setTimeout(() => {
        sentBox.style.display = 'none';
        novaSenhaBox.style.display = 'block';
        setTimeout(() => novaSenhaBox.classList.add('show'), 10);
      }, 600);
    });
  }
});