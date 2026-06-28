gsap.registerPlugin(ScrollTrigger);


gsap.fromTo(".hero-left .rv",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.25 }
);

gsap.fromTo(".hero-right",
  { opacity: 0, x: 50 },
  { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.4 }
);


gsap.to(".real-book",
  { y: -12, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 }
);
gsap.to(".h-script-paper",
  { y: -8, rotation: 5.5, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 }
);
gsap.to(".c-real-book",
  { y: -13, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }
);


gsap.fromTo(".ticket-timeline-item",
  { opacity: 0, x: 30 },
  {
    opacity: 1, x: 0, duration: 0.8, stagger: 0.3, ease: "power3.out",
    scrollTrigger: { trigger: ".about-tickets", start: "top 82%" }
  }
);

gsap.fromTo(".ticket-gap",
  { opacity: 0, scaleY: 0 },
  {
    opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out",
    transformOrigin: "top center",
    scrollTrigger: { trigger: ".about-tickets", start: "top 75%" }
  }
);


document.querySelectorAll(".ticket-wrap").forEach(t => {
  t.addEventListener("mouseenter", () => gsap.to(t,
    { y: -4, rotation: -0.3, duration: 0.3, ease: "power2.out" }
  ));
  t.addEventListener("mouseleave", () => gsap.to(t,
    { y: 0, rotation: 0, duration: 0.3, ease: "power2.out" }
  ));
});


const tickets = document.querySelectorAll(".ticket-wrap");

function animateTickets() {

  gsap.to(tickets[0], {
    y: -8, rotation: -0.4,
    duration: 0.5, ease: "power2.out",
    onComplete: () => {
      
      gsap.to(tickets[0], {
        y: 0, rotation: 0,
        duration: 0.5, ease: "power2.inOut",
        delay: 0.8
      });
    }
  });


  gsap.to(tickets[1], {
    y: -8, rotation: -0.4,
    duration: 0.5, ease: "power2.out",
    delay: 1.8,
    onComplete: () => {
     
      gsap.to(tickets[1], {
        y: 0, rotation: 0,
        duration: 0.5, ease: "power2.inOut",
        delay: 0.8,
        onComplete: () => {
          
          setTimeout(animateTickets, 2000);
        }
      });
    }
  });
}


setTimeout(animateTickets, 2000);

gsap.utils.toArray(".rv").forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 28 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 87%",
        toggleActions: "play none none none"
      }
    }
  );
});


gsap.utils.toArray(".rvl").forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -28 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 87%",
        toggleActions: "play none none none"
      }
    }
  );
});




const cards = document.querySelectorAll(".skill-card");


//moves the cards
gsap.fromTo(cards,
  {
    opacity: 0,
    x: (index) => {
      if (index === 0) return 200;   
      if (index === 1) return 0;     
      if (index === 2) return -200;  
    }
  },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".skills-right",
      start: "top 80%",
      end: "top 5%",
      scrub: 1.5,
    }
  }
);


gsap.utils.toArray(".proj-full").forEach(proj => {
  gsap.fromTo(proj,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.9, ease: "power3.out",
      scrollTrigger: {
        trigger: proj,
        start: "top 85%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    }
  );
});

// ── Active Nav on Scroll ──
const secs  = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  secs.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}, { passive: true });






// ###########################################################################
// Remove white background from ticket images using canvas
function removeWhiteBg(imgEl, threshold=240) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imgEl.naturalWidth || imgEl.width;
  canvas.height = imgEl.naturalHeight || imgEl.height;
  ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i+1], b = px[i+2];
    if (r > threshold && g > threshold && b > threshold) {
      px[i+3] = 0; 
    }
  }
  ctx.putImageData(data, 0, 0);
  imgEl.src = canvas.toDataURL('image/png');
}

document.querySelectorAll('.ticket-img-wrap img').forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    removeWhiteBg(img);
  } else {
    img.addEventListener('load', () => removeWhiteBg(img));
  }
});