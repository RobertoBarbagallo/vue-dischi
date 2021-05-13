new Vue({
    el: "#app",

    data: {
        albumsList: [],
        albumGenres: [],
        selection: ""
    },

    computed: {
        albumsListFiltered(){
            if(!this.selection){
                return this.albumsList
            }
            return  this.albumsList.filter((element => element.genre === this.selection
                ));
        }
    },

    methods: {

    },

    mounted() {

        axios.get('https://flynn.boolean.careers/exercises/api/array/music').then((resp) => {

            const albumsArray = resp.data.response;
                this.albumsList = albumsArray;
            for (let index = 0; index < albumsArray.length; index++) {
                const element = albumsArray[index];
                if (!this.albumGenres.includes(element.genre)) {
                    this.albumGenres.push(element.genre);
                }
            }
            this.albumsList.sort(function (a, b) {
                a.year = parseInt(a.year);
                b.year = parseInt(b.year);
                return a.year - b.year;
            });
        });
    },
})