document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".card-anim", {
        scrollTrigger: {
            trigger: ".card-anim",
            start: "top 90%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    });


    gsap.from(".contact", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 96%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    });


});

const app = Vue.createApp({
    data() {
        return {
            theme: "dark"
        };
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === "dark" ? "light" : "dark";
            document.body.className = this.theme;
        }
    }
}).mount("#app");




