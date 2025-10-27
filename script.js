document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".card-anim", {
        scrollTrigger: {
            trigger: ".card-anim",
            start: "top 95%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,

    });


    gsap.from(".contact", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 90%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,

    });


});

const app = Vue.createApp({
    data() {
        return {
            theme: "dark",
            donneesArr: [{
                id: "",
                title: "",
                category: "",
                images: []
            }]
        };
    },
    mounted() {
        this.getProjet();
       
         const params = new URLSearchParams(window.location.search);
         const projectId = params.get("proj-id");
 
         fetch("./projets.json")
           .then(res => res.json())
           .then(data => {
             this.projet = data.find(p => p.id == projectId);
           });

           const match = document.cookie.match(/theme=(dark|light)/);
           if (match) {
             this.theme = match[1];
             document.body.className = this.theme;
           }
    },
    methods: {
        getProjet() {
            fetch("./projets.json")
                .then(data => data.json())
                .then(infosArr => {
                    this.donneesArr = infosArr;
                    console.log(this.donneesArr);
                })
                .catch(() => {
                    console.error("Erreur lors du chargement des données.");
                });
        },
        toggleTheme() {
            this.theme = this.theme === "dark" ? "light" : "dark";
            document.body.className = this.theme;
            document.cookie = `theme=${this.theme}; path=/; max-age=31536000`
        },
        goToProject(id) {
            window.location.href = `projet.html?proj-id=${id}`;
          }
    }
}).mount("#app");
