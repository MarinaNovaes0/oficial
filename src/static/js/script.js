document.addEventListener('DOMContentLoaded', function() {
  // Navegação suave para as seções do header
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#sobre') {
        e.preventDefault();
        const sobreSection = document.querySelector('.rectangle-7');
        if (sobreSection) {
          window.scrollTo({
            top: sobreSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      } else if (href === '#funcoes') {
        e.preventDefault();
        const funcoesSection = document.querySelector('.rectangle-8');
        if (funcoesSection) {
          window.scrollTo({
            top: funcoesSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      } else if (href === '#faq') {
        e.preventDefault();
        const faqSection = document.querySelector('.rectangle-9');
        if (faqSection) {
          window.scrollTo({
            top: faqSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      } else if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const loginForm = document.getElementById('loginForm');
  const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');

  // Simulação de login (apenas front-end)
  const loginFormElement = document.querySelector('#loginForm form');
  if (loginFormElement) {
    loginFormElement.addEventListener('submit', function(e) {
      e.preventDefault();

      const username = document.querySelector('input[name="username"]').value.trim();
      const password = document.querySelector('input[name="password"]').value.trim();

      if (!username || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      window.location.href = '/painel_admin'; // ou outra ação desejada
    });
  }

  // Botão "Saiba mais"
  const saibaMaisBtn = document.querySelector('.btn-saiba-mais');
  if (saibaMaisBtn) {
      saibaMaisBtn.addEventListener('click', function() {
          alert('O Aquanox é um sistema de controle de irrigação inteligente que utiliza múltiplos parâmetros para otimizar o uso de água.');
      });
  }

  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const mainLoginForm = document.getElementById('loginForm'); // Renomeado para evitar conflito

  // Mostrar formulário de recuperação
  forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();

      // Certifique-se de que as classes estão limpas antes de aplicar novas animações
      mainLoginForm.classList.remove('show', 'hide');
      mainLoginForm.classList.add('hide'); // Adiciona classe para animação de saída

      setTimeout(() => {
          mainLoginForm.style.display = 'none'; // Oculta após a animação
          fetch('/forgot') // Corrigido para usar a rota correta
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Erro ao carregar o formulário de recuperação.');
                  }
                  return response.text();
              })
              .then(html => {
                  forgotPasswordContainer.innerHTML = html;
                  forgotPasswordContainer.style.display = 'block';

                  // Adicionar classe para transição suave
                  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
                  forgotPasswordForm.classList.remove('show'); // Garante estado inicial
                  setTimeout(() => forgotPasswordForm.classList.add('show'), 10);

                  // Adicionar evento para voltar ao login
                  const backToLogin = document.getElementById('backToLogin');
                  backToLogin.addEventListener('click', function(e) {
                      e.preventDefault();

                      forgotPasswordForm.classList.remove('show'); // Remove classe para animação de saída
                      setTimeout(() => {
                          forgotPasswordContainer.style.display = 'none';
                          mainLoginForm.style.display = 'block';
                          mainLoginForm.classList.remove('hide', 'show', 'from-forgot');
                          // Adiciona animação de retorno: começa em -25%
                          mainLoginForm.classList.add('from-forgot');
                          // Força reflow para garantir a transição
                          void mainLoginForm.offsetWidth;
                          // Agora anima para -50%
                          mainLoginForm.classList.add('show');
                          // Remove from-forgot após a animação
                          setTimeout(() => mainLoginForm.classList.remove('from-forgot'), 600);
                      }, 600); // Tempo ajustado para a transição terminar
                  });
              })
              .catch(err => console.error(err.message));
      }, 600); // Tempo ajustado para a animação de saída do login
  });

// Evento para mostrar caixa de confirmação após envio do formulário
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    // Aqui você pode adicionar validação do email se quiser
    // Remove o formulário de recuperação
    forgotPasswordForm.classList.remove('show');
    setTimeout(() => {
      // Carrega sent.html via fetch e exibe na mesma área
      fetch('/sent')
        .then(response => {
          if (!response.ok) throw new Error('Erro ao carregar a confirmação de envio.');
          return response.text();
        })
        .then(html => {
          forgotPasswordContainer.innerHTML = html;
          forgotPasswordContainer.style.display = 'block';
          // Animação da sent-box igual ao forgot
          setTimeout(() => {
            const sentBox = document.getElementById('sentBox');
            if (sentBox) sentBox.classList.add('show');
            // Evento para "Nova senha" abre resetar_senha.html via fetch
            const novaSenhaLink = document.getElementById('novaSenhaLink');
            if (novaSenhaLink) {
              novaSenhaLink.addEventListener('click', function(e) {
                e.preventDefault();
                sentBox.classList.remove('show');
                setTimeout(() => {
                  fetch('/resetar_senha')
                    .then(response => {
                      if (!response.ok) throw new Error('Erro ao carregar a redefinição de senha.');
                      return response.text();
                    })
                    .then(html => {
                      forgotPasswordContainer.innerHTML = html;
                      forgotPasswordContainer.style.display = 'block';
                      setTimeout(() => {
                        const novaSenhaBox = document.getElementById('sentResetBox') || document.getElementById('novaSenhaBox');
                        if (novaSenhaBox) novaSenhaBox.classList.add('show');
                      }, 10);
                    })
                    .catch(err => alert(err.message));
                }, 600);
              });
            }
            // Evento para voltar ao login a partir da caixa sent
            const backToLoginFromSent = document.getElementById('backToLoginFromSent');
            if (backToLoginFromSent) {
              backToLoginFromSent.addEventListener('click', function(e) {
                e.preventDefault();
                sentBox.classList.remove('show');
                setTimeout(() => {
                  forgotPasswordContainer.style.display = 'none';
                  mainLoginForm.style.display = 'block';
                  mainLoginForm.classList.remove('hide', 'show', 'from-forgot');
                  mainLoginForm.classList.add('from-forgot');
                  void mainLoginForm.offsetWidth;
                  mainLoginForm.classList.add('show');
                  setTimeout(() => mainLoginForm.classList.remove('from-forgot'), 600);
                }, 600);
              });
            }
          }, 10);
        })
        .catch(err => alert(err.message));
    }, 600);
  });
  }

  // Alternar visibilidade da senha
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.querySelector('input[name="password"]');

  if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', function() {
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);

          // Alternar imagem do botão
          const imgSrc = type === 'password' ? 'static/img/olhoa.png' : 'static/img/olhof.png'; // Invertida a ordem
          this.style.backgroundImage = `url(${imgSrc})`;
      });

      // Configurar imagem inicial
      togglePassword.style.backgroundImage = 'url(static/img/olhoa.png)'; // Invertida para começar com "olhoa"
      togglePassword.style.backgroundRepeat = 'no-repeat';
      togglePassword.style.backgroundPosition = 'center';
      togglePassword.style.backgroundSize = 'contain';
      togglePassword.style.border = 'none';
      togglePassword.style.cursor = 'pointer';
  }

  // Animação dos rectangles verdes com gradiente fluido via JS
  function addRectangleHoverAnimation(selector) {
    document.querySelectorAll(selector).forEach(function(rect) {
      rect.addEventListener('mouseenter', function() {
        rect.classList.add('hover');
        rect.style.transition = 'transform 0.7s cubic-bezier(.4,1.5,.5,1), box-shadow 0.7s, background 0.4s, background-position 1s';
        rect.style.background = 'linear-gradient(315deg, #2ecc71 0%, #1f5b2c 100%)';
        rect.style.backgroundSize = '200% 200%';
        rect.style.backgroundPosition = '100% 50%';
      });
      rect.addEventListener('mouseleave', function() {
        rect.classList.remove('hover');
        rect.style.transition = 'transform 0.7s cubic-bezier(.4,1.5,.5,1), box-shadow 0.7s, background 0.4s, background-position 1s';
        rect.style.background = 'linear-gradient(135deg, #2ecc71 0%, #1f5b2c 100%)';
        rect.style.backgroundSize = '200% 200%';
        rect.style.backgroundPosition = '0% 50%';
      });
    });
  }
  addRectangleHoverAnimation('.rectangle-14');
  addRectangleHoverAnimation('.rectangle-14-invertida');

  // Expansão da caixa ao clicar na seta
  const seta = document.getElementById('abrirExpansivel');
  const caixa = document.getElementById('caixaExpansivel');
  if (seta && caixa) {
    seta.addEventListener('click', function() {
      caixa.classList.toggle('show');
      seta.classList.toggle('girada');
    });
  }

  // Voltar ao início ao clicar no link da caixa sobre fim.png
  const voltarInicio = document.getElementById('voltar-inicio');
  if (voltarInicio) {
    voltarInicio.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Navegação suave para "Sobre" no fim-link
  const fimSobre = document.querySelector('.fim-link[href="#sobre"]');
  if (fimSobre) {
    fimSobre.addEventListener('click', function(e) {
      e.preventDefault();
      const sobreSection = document.querySelector('.rectangle-7');
      if (sobreSection) {
        window.scrollTo({
          top: sobreSection.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  }

  // Navegação suave para "Funções" no fim-link
  const fimFuncoes = document.querySelector('.fim-link[href="#funcoes"]');
  if (fimFuncoes) {
    fimFuncoes.addEventListener('click', function(e) {
      e.preventDefault();
      const funcoesSection = document.querySelector('.rectangle-8');
      if (funcoesSection) {
        window.scrollTo({
          top: funcoesSection.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  }

  // Navegação suave para "Faq" no fim-link
  const fimFaq = document.querySelector('.fim-link[href="#faq"]');
  if (fimFaq) {
    fimFaq.addEventListener('click', function(e) {
      e.preventDefault();
      const faqSection = document.querySelector('.rectangle-9');
      if (faqSection) {
        window.scrollTo({
          top: faqSection.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  }

  // Botão flutuante para voltar ao topo
  const btnVoltarTopo = document.getElementById('btnVoltarTopo');
  if (btnVoltarTopo) {
    let btnVisible = false;
    let hideTimeout = null;
    let isScrollingToTop = false;

    function showBtnTopo() {
      if (!btnVisible && !isScrollingToTop) {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        btnVoltarTopo.style.display = 'block';
        void btnVoltarTopo.offsetWidth;
        btnVoltarTopo.classList.remove('hide');
        btnVoltarTopo.classList.add('show');
        btnVisible = true;
      }
    }

    function hideBtnTopo() {
      if (btnVisible) {
        btnVoltarTopo.classList.remove('show');
        btnVoltarTopo.classList.add('hide');
        hideTimeout = setTimeout(() => {
          btnVoltarTopo.style.display = 'none';
          hideTimeout = null;
        }, 400);
        btnVisible = false;
      }
    }

    function checkBtnTopo() {
      if (window.scrollY > 200 && !isScrollingToTop) {
        showBtnTopo();
      } else if (!isScrollingToTop) {
        hideBtnTopo();
      }
    }

    window.addEventListener('scroll', checkBtnTopo);

    btnVoltarTopo.addEventListener('click', function() {
      // Some imediatamente ao clicar, antes de rolar
      isScrollingToTop = true;
      hideBtnTopo();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Some durante qualquer rolagem para o topo (inclusive manual)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
      if (window.scrollY < lastScrollY && window.scrollY <= 200) {
        // Se está subindo para o topo, some o botão
        isScrollingToTop = true;
        hideBtnTopo();
      }
      if (window.scrollY === 0) {
        isScrollingToTop = false;
      }
      lastScrollY = window.scrollY;
    });

    // Garante que ao carregar a página no topo, o botão esteja oculto corretamente
    if (window.scrollY <= 200) {
      btnVoltarTopo.style.display = 'none';
      btnVoltarTopo.classList.remove('show', 'hide');
      btnVisible = false;
    }
  }

// Expansão das caixas ao clicar nas setas (FAQ) - só permite uma aberta por vez
function setupExpansiveis() {
  const faq1 = document.querySelector('.rectangle-162-1');
  const faq2 = document.querySelector('.rectangle-162-2');
  const faq3 = document.querySelector('.rectangle-162-3');
  const faq4 = document.querySelector('.rectangle-162-4');
  const GAP = 40;

  // Inicializa todos mais para cima
  [faq1, faq2, faq3, faq4].forEach((el) => {
    if (el) el.style.marginTop = "10px";
  });

  function isAnyOpen() {
    return [
      faq1?.querySelector('.caixa-expansivel-1'),
      faq2?.querySelector('.caixa-expansivel-2'),
      faq3?.querySelector('.caixa-expansivel-3'),
      faq4?.querySelector('.caixa-expansivel-4')
    ].some(caixa => caixa && caixa.classList.contains('show'));
  }

  // Helper para fechar todas as caixas
  function closeAll() {
    [faq1, faq2, faq3, faq4].forEach((faq, idx) => {
      if (!faq) return;
      const caixa = faq.querySelector(`.caixa-expansivel-${idx + 1}`);
      const seta = faq.querySelector('.seta');
      caixa.classList.remove('show');
      seta.classList.remove('girada');
      caixa.style.maxHeight = null;
      faq.style.transition = "margin-top 0.6s cubic-bezier(.4,1.5,.5,1)";
      faq.style.marginTop = "10px";
    });
  }

  // FAQ 1
  if (faq1) {
    const seta1 = faq1.querySelector('.seta');
    const caixa1 = faq1.querySelector('.caixa-expansivel-1');
    if (seta1 && caixa1) {
      seta1.addEventListener('click', function() {
        const isOpen = caixa1.classList.contains('show');
        if (!isOpen && isAnyOpen()) return; // Não abre se outra estiver aberta
        closeAll();
        if (!isOpen) {
          caixa1.classList.add('show');
          seta1.classList.add('girada');
          caixa1.style.maxHeight = caixa1.scrollHeight + "px";
          if (faq2) {
            faq2.style.transition = "margin-top 0.6s cubic-bezier(.4,1.5,.5,1)";
            faq2.style.marginTop = (10 + caixa1.scrollHeight + GAP) + "px";
          }
        }
      });
    }
  }

  // FAQ 2
  if (faq2) {
    const seta2 = faq2.querySelector('.seta');
    const caixa2 = faq2.querySelector('.caixa-expansivel-2');
    if (seta2 && caixa2) {
      seta2.addEventListener('click', function() {
        const isOpen = caixa2.classList.contains('show');
        if (!isOpen && isAnyOpen()) return;
        closeAll();
        if (!isOpen) {
          caixa2.classList.add('show');
          seta2.classList.add('girada');
          caixa2.style.maxHeight = caixa2.scrollHeight + "px";
          if (faq3) {
            faq3.style.transition = "margin-top 0.6s cubic-bezier(.4,1.5,.5,1)";
            faq3.style.marginTop = (10 + caixa2.scrollHeight + GAP) + "px";
          }
        }
      });
    }
  }

  // FAQ 3
  if (faq3) {
    const seta3 = faq3.querySelector('.seta');
    const caixa3 = faq3.querySelector('.caixa-expansivel-3');
    if (seta3 && caixa3) {
      seta3.addEventListener('click', function() {
        const isOpen = caixa3.classList.contains('show');
        if (!isOpen && isAnyOpen()) return;
        closeAll();
        if (!isOpen) {
          caixa3.classList.add('show');
          seta3.classList.add('girada');
          caixa3.style.maxHeight = caixa3.scrollHeight + "px";
          if (faq4) {
            faq4.style.transition = "margin-top 0.6s cubic-bezier(.4,1.5,.5,1)";
            faq4.style.marginTop = (10 + caixa3.scrollHeight + GAP) + "px";
          }
        }
      });
    }
  }

  // FAQ 4
  if (faq4) {
    const seta4 = faq4.querySelector('.seta');
    const caixa4 = faq4.querySelector('.caixa-expansivel-4');
    if (seta4 && caixa4) {
      seta4.addEventListener('click', function() {
        const isOpen = caixa4.classList.contains('show');
        if (!isOpen && isAnyOpen()) return;
        closeAll();
        if (!isOpen) {
          caixa4.classList.add('show');
          seta4.classList.add('girada');
          caixa4.style.maxHeight = caixa4.scrollHeight + "px";
        }
      });
    }
  }
}
setupExpansiveis();
});