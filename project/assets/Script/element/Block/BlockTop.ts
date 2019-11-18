import Hero from "../../Hero";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockTop extends cc.Component {
    onBeginContact(contact,selfCollider,otherCollider:cc.Node){
       
        // console.log(otherCollider);
        // var _hero = otherCollider.getComponent(Hero);
        // cc.log(_hero)
        // _hero.stopJumpAction();
      
    }
}
