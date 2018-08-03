import { FirestoreModel } from './../../framework/dist/myfirebase'
 
class Team extends FirestoreModel {
    
    constructor (ref) {
        super (ref)
    }

    required () {
        return []
    }

    resetName () {
        this.name = ""
    }
}

export default Team;
