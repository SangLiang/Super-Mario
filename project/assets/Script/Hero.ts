const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    // 生命值
    private HP: number = 1;

    private accLeft = false;
    private accRight = false;

    private xSpeed = 120;

    private ani: cc.Animation = null;

    private isRun = false;

    // 是否在起跳状态
    private isJump = false;

    public canJump = true;

    // hero的跳起高度
    private jumpStep: number = 150;

    // 起跳动画
    private jumpAction;

    private deadLine = -400;

    public isAlive = true;

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.moveLeft();
                break;
            case cc.macro.KEY.d:
                this.moveRight();
                break;
            case cc.macro.KEY.space:
                this.jump();
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.stopMoveLeft();
                break;
            case cc.macro.KEY.d:
                this.stopMoveRight();
                break;
        }
    }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.ani = this.getComponent(cc.Animation);

    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private turnSide() {
        this.node.scaleX *= -1;
    }

    private playRightAnimation() {
        if (this.isRun) return;
        if (this.node.scaleX < 0) {
            this.turnSide();
        }
        this.ani.play('hero_run');
        this.isRun = true;
    }

    private playLeftAnimation() {
        if (this.isRun) return;
        if (this.node.scaleX > 0) {
            this.turnSide();
        }
        this.ani.play('hero_run');
        this.isRun = true;
    }

    public moveLeft(){
        this.accLeft = true;
        this.playLeftAnimation();
    }

    public moveRight(){
        this.accRight = true;
        this.playRightAnimation();
    }

    public stopMoveLeft(){
        this.accLeft = false;
        this.stopAnimation();
        this.isRun = false;
    }

    public stopMoveRight(){
        this.accRight = false;
        this.stopAnimation();
        this.isRun = false;
    }

    public jump() {
        if (!this.canJump) return;

        this.isRun = false;
        this.canJump = false;

        this.ani.play('hero_jump');

        this.jumpAction = cc.moveTo(0.5, this.node.position.x, this.node.position.y + this.jumpStep);

        var end_func = cc.callFunc(function () {
        }.bind(this));

        var seq = cc.sequence([this.jumpAction, end_func]);

        this.node.runAction(seq);
    }

    public heroDead() {
        this.isAlive = false;
        try {
            setTimeout(() => {
                cc.director.loadScene("gameOver");
            }, 10)
        } catch (e) {
            cc.error(e);
        }

    }

    // 角色落地后执行
    onLand() {
        this.canJump = true;

        if (this.accLeft) {
            this.playLeftAnimation();
        } else if (this.accRight) {
            this.playRightAnimation();
        }
    }


    public stopJumpAction() {
        this.node.stopAllActions();
    }

    public stopAnimation() {
        if (!this.isRun) return;
        this.ani.stop();
    }

    update(dt) {
        this.move(dt);

        if (this.node.position.y < this.deadLine) {
            this.heroDead();
        }
    }

    private move(dt) {
        if (!this.isAlive) {
            return;
        }

        if (this.accLeft) {
            this.node.x -= this.xSpeed * dt;
        } else if (this.accRight) {
            this.node.x += this.xSpeed * dt;
        }
    }
}
