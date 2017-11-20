
var vue = new Vue({
    el: '#app',
    data: {
        faqs: [],
        search: '',
        loading: true
    },
    methods: {
        formatName(str) {
            return _.kebabCase(str);
        },
        matchesSearch(faq) {
            var search = this.search ? this.search.trim().toLowerCase() : '';

            if(!search) return true;
            if(_.some(faq.tags, tag => _.includes(tag.toLowerCase(), search))) return true;
            if(_.includes(faq.question.toLowerCase(), search)) return true;
            if(_.includes(faq.answer.toLowerCase(), search)) return true;

            return false;
        }
    }
});

axios.get('faq.yml')
    .then(res => {
        var allData = YAML.parse(res.data);
        vue.faqs = allData.faqs;
        vue.loading = false;

        Vue.nextTick(() => {
            if(!window.location.hash) return;

            var el = document.getElementById(window.location.hash.substring(1));
            if(!el) return;

            el.scrollIntoView();
        })
    });
