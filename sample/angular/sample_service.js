class ###Service {
    constructor(){
        
    }

    getSomethingOfId(id, successFn, failFn){
        try {
            var result = { id: id || 0 };
            successFn(result);
        } catch (error) {
            failFn(error);
        }
    }
}

export default angular.module('', []).service(###+'Service', ###Service).name