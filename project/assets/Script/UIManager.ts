
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    @property(cc.Button)
    leftButtom = null;

    @property(cc.Button)
    rightButtom = null;

    @property(cc.Button)
    jumpButtom = null;

    @property(cc.Button)
    shootButtom = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    // update (dt) {}
}
