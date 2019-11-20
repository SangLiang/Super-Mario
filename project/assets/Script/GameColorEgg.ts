const {ccclass, property} = cc._decorator;

@ccclass
export default class GameColorEgg extends cc.Component {
    private homePlace;

    onLoad(){
        this.homePlace = cc.find('Canvas/ground_group/home');
        
    }

    onBeginContact(contact,selfCollider,otherCollider){
        this.triggerEgg(otherCollider);
    }

    triggerEgg(otherCollider){
        if(otherCollider.node.group == 'hero'){
            setTimeout(()=>{
                otherCollider.node.x  = this.homePlace.x - 80;
                otherCollider.node.y = 400;
            },500)
           
        }
    }
}
