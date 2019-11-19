import Hero from "./Hero";
import IHeroLand from "./IHeroLand"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component implements IHeroLand{

    onBeginContact(contact,selfCollider,otherCollider){
       
        var _hero = otherCollider.getComponent(Hero);
        
        if(otherCollider.node.group == 'hero'){
            this.onHeroLand(otherCollider);
            _hero.stopJumpAction();
        }
    }

    onHeroLand(otherCollider){
        cc.log(otherCollider)
        var _hero = otherCollider.getComponent(Hero);

        if(_hero.canJump == false){
            _hero.onLand();
        }
    }

}
