import Hero from "./Hero";
import IHeroLand from "./IHeroLand"
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component implements IHeroLand{

    // onLoad () {}

    start () {

    }

    onBeginContact(contact,selfCollider,otherCollider:cc.Node){
       
        var _hero = otherCollider.getComponent(Hero);
        this.onHeroLand(_hero);
        _hero.stopJumpAction();
      
    }

    onHeroLand(hero){
        hero.onLand();
    }

    // update (dt) {}
}
