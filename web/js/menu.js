const botonMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-principal');

if (botonMenu && menu) {
  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('menu-abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });
}
