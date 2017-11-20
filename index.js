
Vue.use(window['bootstrap-vue']);

var vue = new Vue({
    el: '#app',
    data: {
        faqs: [],
        totalFaqs: 0,
        categories: [],
        search: '',
        loading: true
    },
    methods: {
        formatName(str) {
            return _.kebabCase(str);
        },
        displayTitle(cat) {
            return _.some(this.faqs[cat], faq => this.matchesSearch(faq));
        },
        matchesSearch(faq) {
            var search = this.search ? this.search.trim().toLowerCase() : '';

            if(!search) return true;
            if(_.some(faq.tags || [], tag => _.includes(tag.toLowerCase(), search))) return true;
            if(faq.question && _.includes(faq.question.toLowerCase(), search)) return true;
            if(faq.answer && _.includes(faq.answer.toLowerCase(), search)) return true;
            if(faq.category && _.includes(faq.category.toLowerCase(), search)) return true;

            return false;
        },
        scrollToAndPast(evt) {
            evt.preventDefault();
            var href = evt.target.getAttribute('href');
            var el = href ? document.querySelector(href) : null;
            if (el) {
                document.getElementById('scrollspy-content').scrollTop = el.offsetTop;
            }
        }
    }
});

axios.get('faq.yml')
    .then(res => {
        var allData = YAML.parse(res.data);
        vue.totalFaqs = allData.faqs.length;
        vue.faqs = _.groupBy(allData.faqs, 'category');
        vue.categories = _.sortBy(_.keys(vue.faqs));
        vue.loading = false;

        Vue.nextTick(() => {
            if(!window.location.hash) return;

            var el = document.getElementById(window.location.hash.substring(1));
            if(!el) return;

            el.scrollIntoView();
        })
    });
