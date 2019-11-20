import Hero from "./Hero";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
    @property(cc.Button)
    leftButtom:cc.Button = null;

    @property(cc.Button)
    rightButtom = null;

    @property(cc.Button)
    jumpButtom = null;

    @property(cc.Button)
    shootButtom = null;

    private hero:Hero;

    onLoad () {
        this.hero = cc.find('Canvas/hero').getComponent(Hero);

        this.leftButtom.node.on(cc.Node.EventType.TOUCH_START,this.moveLeft,this);
        this.rightButtom.node.on(cc.Node.EventType.TOUCH_START,this.moveRight,this);

        this.leftButtom.node.on(cc.Node.EventType.TOUCH_END,this.stopMoveLeft,this);
        this.rightButtom.node.on(cc.Node.EventType.TOUCH_END,this.stopMoveRight,this);

        this.jumpButtom.node.on(cc.Node.EventType.TOUCH_START,this.heroJump,this)
    }

    moveLeft(){
        this.hero.moveLeft();
    }

    moveRight(){
        this.hero.moveRight();
    }

    stopMoveLeft(){
        this.hero.stopMoveLeft();
    }

    stopMoveRight(){
        this.hero.stopMoveRight();
    }

    heroJump(){
        this.hero.jump();
    }
    
}
