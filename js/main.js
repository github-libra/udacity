
var Cat = function(cat){
    this.clickCount = ko.observable(cat.clickCount)
    this.name = ko.observable(cat.name)
    this.src = ko.observable(cat.src)
    this.nicknames = ko.observableArray(cat.nicknames)

    this.title = ko.computed(function(){
        var title;
        var clicks = this.clickCount();
        if(clicks < 10){
            title = 'New Born';
        }else if( clicks < 20){
            title = 'Infant';
        }else {
            title = 'Child'
        }
        return title;
    }, this)
}

var ViewModel = function(){
    var self = this;
    self.currentCat = ko.observable( new Cat({
        name: 'tabbie',
        clickCount: 5,
        src: 'http://static.squarespace.com/static/52f11fc0e4b0c058f6093d71/t/53ee29dbe4b052f83849a3f3/1408117211608/Animals___Cats_Small_cat_calls_mom_046864_.jpg',
        nicknames: ['asf','asdfffff']
    }) )
    self.incrementCounter = function(){
        self.currentCat().clickCount(self.currentCat().clickCount() + 1)
    }
}
ko.applyBindings(new ViewModel())
