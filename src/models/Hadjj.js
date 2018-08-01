import { FirestoreModel } from './../../framework/dist/myfirebase'
 

class Hadjj extends FirestoreModel {
    
    constructor (ref) {
        super (ref)
    }

    required () {
        return []
    }
}

export default Hadjj;
