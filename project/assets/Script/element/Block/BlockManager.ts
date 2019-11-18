import Hero from "../../Hero";

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
export default class BlockManager extends cc.Component {

    @property(cc.Node)
    topGround = null;

    // onLoad () {}

    start () {
       
    }
  
    onBeginContact(contact,selfCollider,otherCollider){
       
        var _hero = otherCollider.getComponent(Hero);

        cc.log(selfCollider.node.x)
        cc.log(otherCollider.node.x)
        cc.log(selfCollider)
        _hero.stopJumpAction();
      
    }

    // update (dt) {}
}
