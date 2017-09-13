require('./###.scss');
const template = require('./###.component.html');

class ###Controller {
    constructor(###Service){
        this.###Service = ###Service;
        this.message = "Hello world";
    }
}

const ###Component = {
    templateUrl: template,
    controller: ###Controller,
    bindings: {
        data: '<'
    }
};

export default ###Component;