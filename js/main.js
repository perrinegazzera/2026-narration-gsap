/* Imports -------------------------------------- */
gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin);

/* Variables ------------------------------------ */

/* Fonctions ------------------------------------ */

Draggable.create(".doodle"), {
    type: "x,y",
}