
var vue = new Vue({
    el: '#app',
    data: {
        faqs: [],
        loading: true
    },
    methods: {
    }
});

axios.get('faq.yml')
    .then(res => {
        var allData = YAML.parse(res.data);
        vue.faq = allData.faq;
        vue.loading = false;
    });
