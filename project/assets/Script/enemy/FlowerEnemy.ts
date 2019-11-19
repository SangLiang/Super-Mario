import Hero from "../Hero";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlowerEnemy extends cc.Component {

    private isMove = false;

    start() {

    }
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == 'hero') {
            var hero: Hero = otherCollider.getComponent(Hero);
            if (hero.isAlive) {
                hero.heroDead();
            }
        }
    }

    move() {
        if(this.isMove) return;
        this.isMove = true;
        var origin = this.node.position.y;

        var ac = cc.moveTo(1.3, this.node.position.x, this.node.position.y + 60);
        var ac2 = cc.moveTo(1, this.node.position.x, origin);

        var end_func = cc.callFunc(function () {
            this.isMove = false;
        }.bind(this));

        var seq = cc.sequence([ac, ac2, end_func]);

        this.node.runAction(seq);
    }
    // update (dt) {}
}
