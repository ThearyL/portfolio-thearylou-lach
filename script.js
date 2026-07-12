const app = Vue.createApp({

    data() {
        return {
            projet: null,
            theme: "light",
            selectedCategories: [],
            currentTime: new Date(),

            // IMAGE MODAL
            selectedImage: "",

            // DONNEES JSON
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

        // URL PARAMS
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get("proj-id");

        // LOAD JSON
        try {

            const res = await fetch("./projets.json");
            const data = await res.json();

            this.projet = data.find(p => p.id == projectId);
            this.donneesArr = data;

        } catch (err) {

            console.error(
                "Erreur lors du chargement des données :",
                err
            );
        }

        await Vue.nextTick();

        // CLOCK
        this.timer = setInterval(() => {
            this.currentTime = new Date();
        }, 1000);

        // GSAP
        gsap.registerPlugin(ScrollTrigger);

        // CARDS ANIMATION
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

        // CONTACT ANIMATION
        gsap.from(".contact", {

            scrollTrigger: {
                trigger: ".contact",
                start: "top 98%",
                toggleActions: "play none none none",
            },

            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
        });

        // HASH SCROLL
        if (window.location.hash) {

            const target = document.querySelector(
                window.location.hash
            );

            if (target) {

                setTimeout(() => {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }, 50);
            }
        }

        // EMOJI ANIMATION
        anime.animate('.emoji', {

            rotate: [
                { to: 14, duration: 500 },
                { to: -8, duration: 500 },
                { to: 14, duration: 500 },
                { to: 0, duration: 550 }
            ],

            ease: 'inOutQuad',
            loop: true,
            loopDelay: 1250
        });
    },

    beforeUnmount() {
        clearInterval(this.timer);
    },

    computed: {

        // SHOW PROJECT
        showProject() {
            return this.projet && this.projet.id === 3;
        },

        // FILTER PROJECTS
        filteredProjects() {

            if (this.selectedCategories.length === 0) {
                return this.donneesArr;
            }

            return this.donneesArr.filter(project =>

                project.skills.some(skill =>
                    this.selectedCategories.includes(skill)
                )
            );
        }
    },

    watch: {

        selectedCategories() {

            this.$nextTick(() => {
                ScrollTrigger.refresh();
            });
        }
    },

    methods: {

        // GET JSON
        getProjet() {

            fetch("./projets.json")

                .then(data => data.json())

                .then(infosArr => {

                    this.donneesArr = infosArr;
                    console.log(this.donneesArr);

                })

                .catch(() => {

                    console.error(
                        "Erreur lors du chargement des données."
                    );
                });
        },

        // REDIRECT
        goToProject(id) {

            window.location.href =
                `projet.html?proj-id=${id}`;
        },

        // DATE FORMAT
        formatToEST(date) {

            if (!date) return "";

            return new Intl.DateTimeFormat('fr-CA', {

                timeZone: 'America/New_York',
                dateStyle: 'medium',
                timeStyle: 'medium',

            }).format(date);
        },

        // OPEN IMAGE MODAL
        openModal(image) {

            this.selectedImage = image;

            const modal = new bootstrap.Modal(
                document.getElementById("imageModal")
            );

            modal.show();
        },
    },

}).mount("#app");