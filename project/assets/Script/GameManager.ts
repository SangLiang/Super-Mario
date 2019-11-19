
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

        var Bits:cc.DrawBits = cc.PhysicsManager.DrawBits;

        cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;

    }

    start () {

    }

}
