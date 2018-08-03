import { FirestoreModel } from 'myfirebase'
 
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
