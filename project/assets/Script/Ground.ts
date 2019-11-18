import Hero from "./Hero";
import IHeroLand from "./IHeroLand"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component implements IHeroLand{

    // onLoad () {}

    start () {

    }

    onBeginContact(contact,selfCollider,otherCollider){
       
        var _hero = otherCollider.getComponent(Hero);
        if(otherCollider.node.group == 'hero'){
            this.onHeroLand(_hero);
            _hero.stopJumpAction();
        }
    }

    onHeroLand(hero){
        hero.onLand();
    }

    // update (dt) {}
}
