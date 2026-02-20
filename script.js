const app = Vue.createApp({
    data() {
        return {
            projet: null,
            theme: "light",
            selectedCategories: [],
            //Donnees du JSON
            donneesArr: [{
                id: "",
                title: "",
                shortDescription: "",
                category: "",
                skills: [],
                images: [],
                alt: []
            }]
        };
    },

    async mounted() {

        //Pour obtenir et manipuler les paramètres de la chaîne de requête dans l'URL actuelle de la page.
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get("proj-id");

        //charge les données du fichier projets.json, trouve le projet correspondant à l’identifiant projectId, le stocke dans this.projet, puis exécute la fonction getProjet().
        try {
            const res = await fetch("./projets.json");
            const data = await res.json();
            this.projet = data.find(p => p.id == projectId);
            this.donneesArr = data;
        } catch (err) {
            console.error("Erreur lors du chargement des données :", err);
        }

        await Vue.nextTick();

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
                start: "top 95%",
                toggleActions: "play none none none",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
        });

        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth" });
                }, 50);
            }
        }
    },

    computed: {
        //Pour afficher la conception du projet avec le processus de creation
        showProject() {
            return this.projet && this.projet.id === 3;
        },

        // <-- Added: Filtre les projets selon les compétences sélectionnées
        filteredProjects() {
            // Si aucune case n'est cochée → afficher tous les projets
            if (this.selectedCategories.length === 0) {
                return this.donneesArr;
            }

            // Sinon → filtrer selon les skills
            return this.donneesArr.filter(project =>
                project.skills.some(skill =>
                    this.selectedCategories.includes(skill)
                )
            );
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

        //Redirige vers la page projet.html en y ajoutant l’identifiant du projet (id) dans l’URL.
        goToProject(id) {
            window.location.href = `projet.html?proj-id=${id}`;
        },
    },

}).mount("#app");
