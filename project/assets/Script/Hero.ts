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
    private isJump  = false;
    private canJump = true;

    private target:Number = 0;

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
            case cc.macro.KEY.space:
                this.jump();
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
        this.ani.play('hero_run');
        this.isRun = true;
       
    }

    private playLeftAnimation(){
        if(this.isRun) return ;
        if(this.node.scaleX > 0){
            this.node.scaleX *= -1;
        }
        var self = this;
        let _clipName = this.ani.getClips()[0].name;
        this.ani.play('hero_run');
        this.isRun = true;
    }

    jump(){

        this.target = this.node.position.y + 20;

        var self = this;
        this.canJump = true;
        let _clipName = this.ani.getClips()[1].name;
        this.ani.play('hero_jump');

        let action = cc.moveTo(0.5, this.node.position.x, this.node.position.y +100)

        // 执行动作，所有的动作都需要一个目标通过 runAction 去执行它

        this.node.runAction(action)
      
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

        if(this.canJump){
            if(this.target == 0 ) return ;

            // if(this.node.y < this.target){
            //     this.node.y += 3.5;
            //     cc.log(222);
            // }else {
            //     cc.log(111);
            //     this.target = 0;
            //     this.canJump = false;
            //     cc.log(this.canJump);
            // }
        }
    }
}
