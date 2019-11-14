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

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // 生命值
    private HP: number = 1;

    private accLeft = false;
    private accRight = false;
    private accJump = false;

    private maxMoveSpeed = 100;
    private accel = 80;
    private xSpeed =0;

    // LIFE-CYCLE CALLBACKS:

    onKeyDown(event) {
        // set a flag when key pressed
        cc.log('键盘按下');
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                // this.
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    }

    // moveLeft() {
    //     console.log(111);
    //     this.node.setPosition(this.node.position.x - 10, this.node.position.y);
    // }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    update(dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
            // this.node.x += this.xSpeed * dt;
            // this.node.x -= this.xSpeed * dt;



        } else if (this.accRight) {
            // this.node.x += this.xSpeed * dt;

            this.xSpeed += this.accel * dt;
            // this.node.x += this.xSpeed * dt;
        }
        // // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // // 根据当前速度更新主角的位置
        
        this.node.x += this.xSpeed * dt;

        
    }
}
