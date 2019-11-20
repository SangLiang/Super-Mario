const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends cc.Component {
    private hero;

    onLoad(){
        this.hero = cc.find("Canvas/hero");
    }

    update (dt) {
        if(Math.abs(this.node.x - this.hero.x) < 30){
            cc.director.loadScene('gameSuccess');
        }
    }
}
