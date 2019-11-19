import Hero from "../../Hero";

const { ccclass, property } = cc._decorator;

enum ContactPosition { TOP, BOTTOM, OTHER };

@ccclass
export default class BlockManager extends cc.Component {

    @property(cc.Node)
    coin: cc.Node = null;

    @property()
    conisCount = 1;

    private originPostionY;

    private canbeScore = true;

    private ani:cc.Animation = null;

    onLoad () {
        this.ani = this.node.getComponent(cc.Animation);
    }


    start() {
        this.originPostionY = this.node.y;
        this.node.zIndex = 1;
        this.ani.play('block_default');

    }

    onBeginContact(contact, selfCollider, otherCollider) {

        var _hero: Hero = otherCollider.getComponent(Hero);
        var contactPosition = this.getContactPosition(selfCollider, otherCollider);

        if (contactPosition == ContactPosition.TOP) {
            _hero.stopJumpAction();
            this.makeHeroOnLand(_hero);
        } else if (contactPosition == ContactPosition.BOTTOM) {
            _hero.stopJumpAction();
            this.playScoreAction();
            this.playScoreCoinAction();
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


        var _ac = cc.moveTo(0.2, this.node.position.x, this.originPostionY + 5);
        var _ac2 = cc.moveTo(0.2, this.node.position.x, this.originPostionY);

        this.onScore();

        var end_func = cc.callFunc(function () {
            if(this.conisCount > 0){
                this.canbeScore = true;
            }
        }.bind(this))
        var seq = cc.sequence([_ac, _ac2, end_func]);
        this.node.runAction(seq);

    }

    playScoreCoinAction (){
        var _ac = cc.moveTo(0.4, this.node.position.x, this.originPostionY + 60); 
        var _ac2 = cc.moveTo(0.3, this.node.position.x, this.originPostionY);

        var end_func = cc.callFunc(function () {
            this.coin.active = false;
        }.bind(this))
        var seq = cc.sequence([_ac, _ac2, end_func]);
        this.coin.runAction(seq);
    }

    onScore(){
        if(this.conisCount > 0){
            this.conisCount -= 1;
        }

        if(this.conisCount <= 0 ){
            this.playNocoinAnimation();
        }
    }

    makeHeroOnLand(hero:Hero){
        hero.onLand();
    }

    playNocoinAnimation(){
        this.ani.play('block_empty');
    }

    // update (dt) {}
}
