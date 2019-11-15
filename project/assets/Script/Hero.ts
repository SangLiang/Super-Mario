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
export default class Hero extends cc.Component {

    // 生命值
    private HP: number = 1;

    private accLeft = false;
    private accRight = false;
    private accJump = false;

    private maxMoveSpeed = 100;
    private accel = 80;
    private xSpeed =80;

    private ani:cc.Animation = null;
    private isRun = false;

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                this.playRightAnimation();
                break;
        }
    }

    onKeyUp(event) {
        // let _clipName = this.ani.getClips()[0].name
        // this.ani.stop(_clipName);
        // console.log(_clipName)
        // cc.log('动画停下来');
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                this.stopAnimation();
                this.isRun  =false;

                cc.log(this.isRun)

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
        var self = this;
        let _clipName = this.ani.getClips()[0].name
        this.ani.play(_clipName);
        this.isRun = true;
        //  this.ani.on('stop',function(){
        //     if(self.accRight == false) return;
        //     self.ani.play(_clipName);
        // })
    }

    private stopAnimation(){
        if(!this.isRun) return;
        cc.log(123)
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
