document.addEventListener('DOMContentLoaded', () => {
    // Animation GSAP avec scrolltrigger sur la page d'accueil
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
            projet: null,
            theme: "dark",
            donneesArr: [{
                id: "",
                title: "",
                shortDescription: "",
                category: "",
                skills: [],
                images: []
            }]
        };
    },
    mounted() {
        //Sauvegarde du theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.theme = savedTheme;
            document.body.classList.add(savedTheme);
        } else {

            document.body.classList.add('dark');
        }
        //Pour obtenir et manipuler les paramètres de la chaîne de requête dans l'URL actuelle de la page.
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get("proj-id");

        //charge les données du fichier projets.json, trouve le projet correspondant à l’identifiant projectId, le stocke dans this.projet, puis exécute la fonction getProjet().
        fetch("./projets.json")
            .then(res => res.json())
            .then(data => {

                this.projet = data.find(p => p.id == projectId);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des données :", err);
            });

        this.getProjet();


    }, computed: {
        //Pour afficher la conception du projet avec le processus de creation
        showProject() {
            return this.projet && this.projet.id === 3;
        }
    },
    methods: {
        //Cherche les donnees dans le json
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
        //Changement du theme avec un comparaison et ajoute la classe au body
        toggleTheme() {
            this.theme = this.theme === "dark" ? "light" : "dark";
            document.body.className = this.theme;

            localStorage.setItem('theme', this.theme);

        },
        //Redirige vers la page projet.html en y ajoutant l’identifiant du projet (id) dans l’URL.
        goToProject(id) {
            window.location.href = `projet.html?proj-id=${id}`;
        },

    },
}).mount("#app");
