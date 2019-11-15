const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    // 生命值
    private HP: number = 1;

    private accLeft = false;
    private accRight = false;
    private accJump = false;

    private xSpeed =80;

    private ani:cc.Animation = null;
    private isRun = false;

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                this.playLeftAnimation();
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                this.playRightAnimation();
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                this.stopAnimation();
                this.isRun  =false;

                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                this.stopAnimation();
                this.isRun  =false;
                break;
        }
    }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.ani = this.getComponent(cc.Animation);
    }

    onDestroy (){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private playRightAnimation(){
        if(this.isRun) return ;
        if(this.node.scaleX < 0){
            this.node.scaleX *= -1;
        }
        var self = this;
        let _clipName = this.ani.getClips()[0].name
        this.ani.play(_clipName);
        this.isRun = true;
       
    }

    private playLeftAnimation(){
        if(this.isRun) return ;
        if(this.node.scaleX > 0){
            this.node.scaleX *= -1;
        }
        var self = this;
        let _clipName = this.ani.getClips()[0].name
        this.ani.play(_clipName);
        this.isRun = true;
    }

    private stopAnimation(){
        if(!this.isRun) return;
        this.ani.stop();
    }

    start() {
       
    }

    update(dt) {
        if (this.accLeft) {
            this.node.x -= this.xSpeed * dt;
        } else if (this.accRight) {
            this.node.x += this.xSpeed * dt;
        }
    }
}
