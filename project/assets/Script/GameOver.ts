const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    @property(cc.Node)
    playAgain = null;

    onLoad(){
        this.playAgain.on(cc.Node.EventType.TOUCH_START,this.playAgainFunc,this)
    }

    playAgainFunc(){
        cc.director.loadScene('stage_1');
    }
}
