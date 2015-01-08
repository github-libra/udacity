// var cats = [{
//     name: 'Json',
//     src: 'http://static.squarespace.com/static/52f11fc0e4b0c058f6093d71/t/53ee29dbe4b052f83849a3f3/1408117211608/Animals___Cats_Small_cat_calls_mom_046864_.jpg',
//     numOfClick: 0
// }, {
//     name: 'Oliver',
//     src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcThtVuIQ7CBYssbdwtzZjVLI_uw09SeLmyrxaRQEngnQAked5ZB',
//     numOfClick: 0
// }]

// var listView = {
//     render: function() {
//         var listDom = document.getElementsByClassName('list')[0];
//         var listItemDom = '';
//         for (var i = 0; i < cats.length; ++i) {
//             listItemDom = document.createElement('li');
//             listItemDom.innerText = cats[i].name;
//             listDom.appendChild(listItemDom);
//             listItemDom.addEventListener('click', (function(index) {
//                 return function(){
//                     console.log('data');
//                     Octipos.whenListIsClicked(index);
//                 }
//             })(i), false);
//         }
//     }
// }

// var detailView = {
//     clear: function() {
//         document.getElementsByClassName('detail')[0].innerHTML = '';
//     },
//     render: function(cat) {
//         var detailDom = document.getElementsByClassName('detail')[0];
//         var img = document.createElement('img');
//         var clickDom = document.createElement('span')
//         img.src = cat.src;
//         clickDom.innerText = cat.numOfClick;
//         detailDom.appendChild(img)
//         detailDom.appendChild(clickDom)

//         img.addEventListener('click', (function(cat) {
//             return function() {
//                 Octipos.whenDetailIsClicked(cat)
//             }
//         })(cat), false);
//     },
//     updateCount: function(cat) {

//     }
// }

// var Octipos = {
//     init: function() {
//         listView.render();
//     },
//     whenListIsClicked: function(index) {
//         detailView.clear();
//         detailView.render(cats[index]);
//     },
//     whenDetailIsClicked: function(cat) {
//         ++cat.numOfClick;
//         detailView.render();
//     }
// }
// Octipos.init();



var model = {
    currentCat: null,
    cats: [{
        name: 'Json',
        src: 'http://static.squarespace.com/static/52f11fc0e4b0c058f6093d71/t/53ee29dbe4b052f83849a3f3/1408117211608/Animals___Cats_Small_cat_calls_mom_046864_.jpg',
        numOfClick: 0
    }, {
        name: 'Oliver',
        src: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcThtVuIQ7CBYssbdwtzZjVLI_uw09SeLmyrxaRQEngnQAked5ZB',
        numOfClick: 0
    }]
}

var octopus = {

    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.numOfClick++;
        catView.render();
    },

    isAdminShown: function(){
        return adminModel.show;
    },

    showAdmin: function(){
        adminModel.show = true;
        adminView.render();
    },

    hideAdmin: function(){
        adminModel.show = false;
        adminView.render();
    },

    saveCat: function(cat1){
        var cat = this.getCurrentCat();
        cat = cat1;
        catView.render();
    },

    getAdminCat: function(){
        return adminModel.cat;
    },

    setAdminCat: function(cat1) {
        adminModel.cat = cat1;
        console.log(adminModel.cat);
    }
}

var catView = {

    init: function() {

        this.catElem = document.getElementById('cat')
        this.catNameElem = document.getElementById('cat-name')
        this.catImgElem = document.getElementById('cat-img')
        this.catCountElem = document.getElementById('cat-count')

        this.catImgElem.addEventListener('click', function(e) {
            octopus.incrementCounter();
            octopus.hideAdmin();
        })

        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.src;
        this.catCountElem.textContent = currentCat.numOfClick;
    }



}
var catListView = {

    init: function() {
        this.catlistElem = document.getElementById('cat-list')
        this.render();
    },

    render: function() {
        var cats = octopus.getCats();

        this.catlistElem.innerHTML = '';

        for (var i = 0; i < cats.length; ++i) {
            var cat = cats[i];
            var li = document.createElement('li');
            li.textContent = cat.name;

            li.addEventListener('click', (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                    octopus.hideAdmin();
                }
            })(cat), false)

            this.catlistElem.appendChild(li)
        }
    }
}

var adminModel = {
    show: false,
    cat: {}
}
var adminView = {

    init: function() {
        this.adminElem = document.getElementById('admin');
        this.adminBtn = document.getElementById('show-admin');
        this.catName = document.getElementById('name');
        this.catClick = document.getElementById('click');
        this.catSrc = document.getElementById('src');
        this.saveBtn = document.getElementById('save');
        this.cancelBtn = document.getElementById('cancel');

        this.adminBtn.addEventListener('click', function(){
            if(octopus.isAdminShown()){
                octopus.hideAdmin();
            }else{
                octopus.showAdmin();
            }
        }, false);

        this.saveBtn.addEventListener('click', function(e){
            e.preventDefault();
            adminView.save();
        });

        this.cancelBtn.addEventListener('click', function(e){
            octopus.hideAdmin();
        })

        this.render();
    },

    render: function() {
        if (octopus.isAdminShown()) {
            octopus.setAdminCat(octopus.getCurrentCat());
            var cat = octopus.getAdminCat();
            this.catName.value = cat.name;
            this.catClick.value = cat.numOfClick;
            this.catSrc.value = cat.src;
            this.adminElem.style.display = 'block';
        } else {
            this.adminElem.style.display = 'none';
        }
    },

    save: function(){
        var cat = octopus.getAdminCat();
        cat.name = this.catName.value;
        cat.numOfClick = this.catClick.value;
        cat.src = this.catSrc.value;
        octopus.saveCat(cat);
        octopus.hideAdmin();
    }
}

octopus.init();
