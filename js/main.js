/* Imports -------------------------------------- */
gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin);

/* Variables ------------------------------------ */

/* Fonctions ------------------------------------ */

/*Section 1 -------------------------------------------------------------------------------*/

Draggable.create(".doodle", {
    type: "x,y",
    onDragStart: function() {
        // Petit effet visuel quand on attrape l'élément
        gsap.to(this.target, { scale: 1.1, zIndex: 10 });
    },
    onDragEnd: function() {
        const character = document.querySelector(".perrine");

        // On vérifie si le doodle survole / touche le personnage
        if (Draggable.hitTest(this.target, character)) {
            // Change l'image principale selon l'ID du doodle lâché
            switch (this.target.id) {
                case "doodle-clap":
                    character.src = "assets/image/perrine_clap.png";
                    break;
                case "doodle-crayon":
                    character.src = "assets/image/perrine_crayon.png";
                    break;
                case "doodle-laptop":
                    character.src = "assets/image/perrine_laptop.png";
                    break;
                case "doodle-camera":
                    character.src = "assets/image/perrine_appareil.png";
                    break;
            }
        }

        // Remet le doodle à sa position initiale et réinitialise son échelle
        gsap.to(this.target, {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 1,
            ease: "power2.out"
        });
    }
});


/* Easter Egg */
Draggable.create(".logo_header", {
    type: "x,y",
    onDragStart: function() {
        gsap.to(this.target, { scale: 1.1, zIndex: 10 });
    },
    onDragEnd: function() {
        const character = document.querySelector(".perrine");

        // Vérifie si le logo touche le personnage
        if (Draggable.hitTest(this.target, character)) {
            // Change par l'image de ton choix (par exemple une version spéciale)
            character.src = "assets/image/perrine_irl.png"; // Adapte le chemin/nom de l'image
        }

        // Remet le logo à sa place dans le header et réinitialise son échelle
        gsap.to(this.target, {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 9999, // Pour qu'il reste bien au-dessus dans le header
            ease: "power2.out"
        });
    }
});




/*Section 2 -------------------------------------------------------------------------------*/


const polaroidTween = gsap.to(".polaroid-img", {
    scrollTrigger: {
        trigger: '#section1',      
        start: 'center center',     
        endTrigger: '#section2',    
        end: '5%',       
        scrub: 1,                 
        markers: false,            
        id: "window2",
    },
    y: 225,                        
    ease: "none"
});

// Configuration du Draggable avec suppression du ScrollTrigger au clic
Draggable.create(".polaroid-img", {
    type: "x,y",
    onPress: function() {
        // Dès qu'on clique/touche l'élément pour le déplacer, on supprime l'animation et le ScrollTrigger
        if (polaroidTween.scrollTrigger) {
            polaroidTween.scrollTrigger.kill(true); // Tue le ScrollTrigger
        }
        polaroidTween.kill(); // Tue l'animation GSAP liée
    }
});

/*Section 3 -------------------------------------------------------------------------------*/

/* Duplication des cartes pour la boucle infinie */
const container = document.querySelector(".projects-grid");
container.innerHTML += container.innerHTML;

/* Animation GSAP */
const carousselAnim = gsap.to(container, {
    x: "-50%",
    duration: 20,
    ease: "none",
    repeat: -1,
    paused: true // On commence par la mettre en pause pour laisser le ScrollTrigger la piloter proprement
});

/* ScrollTrigger séparé pour lancer/arrêter l'animation quand on est dans la section */
ScrollTrigger.create({
    trigger: "#section3",
    start: "top center",
    end: "bottom center",
    onEnter: () => carousselAnim.play(),
    onLeave: () => carousselAnim.pause(),
    onEnterBack: () => carousselAnim.play(),
    onLeaveBack: () => carousselAnim.pause()
});

/* Stop / Play au survol de la souris sur les cartes */
container.addEventListener("mouseenter", () => carousselAnim.pause());
container.addEventListener("mouseleave", () => carousselAnim.play());

/* Permettre de faire défiler le carrousel à la main */
Draggable.create(".projects-grid", {
    type: "x",
    bounds: "#section3", // Empêche de sortir de la section
    inertia: true,       // Effet d'inertie fluide
    onPress: function() {
        carousselAnim.pause(); // Met en pause l'animation auto quand on attrape le carrousel
    },
    onRelease: function() {
        carousselAnim.play();  // Relance l'animation auto quand on lâche
    }
});