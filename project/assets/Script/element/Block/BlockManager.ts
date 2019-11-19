import Hero from "../../Hero";

const { ccclass, property } = cc._decorator;

enum ContactPosition { TOP, BOTTOM, OTHER };

@ccclass
export default class BlockManager extends cc.Component {

    @property(cc.Node)
    coin: cc.Node = null;

    // onLoad () {}
    private originPostionY;

    private canbeScore = true;

    start() {
        this.originPostionY = this.node.y;
        this.node.zIndex = 1;

    }

    onBeginContact(contact, selfCollider, otherCollider) {

        var _hero: Hero = otherCollider.getComponent(Hero);
        cc.log(_hero);
        var contactPosition = this.getContactPosition(selfCollider, otherCollider);

        if (contactPosition == ContactPosition.TOP) {
            _hero.stopJumpAction();
        } else if (contactPosition == ContactPosition.BOTTOM) {
            _hero.stopJumpAction();
            this.playScoreAction();
        }


    }

    getContactPosition(selfCollider, otherCollider) {
        if (this.isInBottom(selfCollider, otherCollider)) {
            return ContactPosition.BOTTOM;
        } else if (this.isInTop(selfCollider, otherCollider)) {
            return ContactPosition.TOP;
        } else {
            return ContactPosition.OTHER;
        }
    }

    isInBottom(selfCollider, otherCollider) {
        var parent = this.node.parent;
        var objX = parent.x;
        var objY = parent.y;

        // x位置判断
        if (objX + selfCollider.node.width > otherCollider.node.x && objX - selfCollider.node.width < otherCollider.node.x) {
            // y 位置判断
            if (objY > otherCollider.node.y) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    isInTop(selfCollider, otherCollider) {
        var parent = this.node.parent;
        var objX = parent.x;
        var objY = parent.y;

        // x位置判断
        if (objX + selfCollider.node.width > otherCollider.node.x && objX - selfCollider.node.width < otherCollider.node.x) {
            // y 位置判断
            if (objY < otherCollider.node.y) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    playScoreAction() {

        if (!this.canbeScore) return;
        this.canbeScore = false;

        var _ac = cc.moveTo(0.1, this.node.position.x, this.originPostionY + 5);
        var _ac_2 = cc.moveTo(0.1, this.node.position.x, this.originPostionY);


        var end_func = cc.callFunc(function () {
            this.canbeScore = true;
        }.bind(this))
        var seq = cc.sequence([_ac, _ac_2, end_func]);
        this.node.runAction(seq);
    }

    // update (dt) {}
}
