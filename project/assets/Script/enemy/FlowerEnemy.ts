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
export default class FlowerEnemy extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onBeginContact(contact,selfCollider,otherCollider){
       

        cc.log('碰撞')
    }

    move(){
        var origin = this.node.position.y;

        var ac = cc.moveTo(1, this.node.position.x, this.node.position.y + 60);
        var ac2 = cc.moveTo(0.5, this.node.position.x, origin);

        var end_func = cc.callFunc(function () {

        }.bind(this));

        var seq = cc.sequence([ac, ac2, end_func]);

        this.node.runAction(seq);
    }
    // update (dt) {}
}
