// ==== Masque JavaScript ====

// Year in footer
(function(){
  const yearSpan = document.getElementById('y');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();

// Parallax tilt for the logo
(function(){
  const shell = document.querySelector('.logo-shell');
  const logo  = document.querySelector('.logo-shell .logo');
  if(!shell || !logo) return;

  let rect = null;
  function updateRect(){ rect = shell.getBoundingClientRect(); }
  updateRect();
  window.addEventListener('resize', updateRect);

  shell.addEventListener('mousemove', (e) => {
    if(!rect) return;
    const x = (e.clientX - (rect.left + rect.width/2)) / (rect.width/2);
    const y = (e.clientY - (rect.top  + rect.height/2)) / (rect.height/2);
    const maxTilt = 10; // degrees
    logo.style.transform =
      `rotateY(${x*maxTilt}deg) rotateX(${-y*maxTilt}deg) translateZ(6px)`;
  });

  shell.addEventListener('mouseleave', () => {
    logo.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
  });
})();

// IntersectionObserver: reveal on scroll
(function(){
  const IO = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add('on');
        IO.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal, .reveal-stagger')
          .forEach(el => IO.observe(el));
})();
