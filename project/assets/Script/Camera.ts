
const {ccclass, property} = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    start () {
    }

    update (dt) {
        this.node.x = this.player.position.x;
    }
}
