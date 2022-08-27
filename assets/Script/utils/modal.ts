// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import SetCom from "../utils/setCom";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';


    scaleFn(num: number) {
        let btn = this.node.getChildByName("handle").getChildByName("btn");
        btn.scale = num
    }
    changeBtnImg(url) {
        let btn = this.node.getChildByName("handle").getChildByName("btn");
        let btnImg = btn.getComponent(cc.Sprite);
        btnImg.spriteFrame = url;
    }

    changeLabel(str) {
        let labelNode = this.node.getChildByName("handle").getChildByName("label");
        let label = labelNode.getComponent(cc.Label);
        label.string = str
    }
    /**
     * 更改文字、图片
     * @param data 
     * @param type 
     */
    changeNode(data, type: number, fn) {
        let propGroup = this.node.getChildByName('propGroup')
        switch (type) {
            case 2:
                propGroup.getChildByName('num').getComponent(cc.Label).string = `x${data.rewardNum}`;
                break;
            case 3:
            case 5:
                propGroup.getChildByName('debris').getComponent(cc.Sprite).spriteFrame = data.rewardIcon;
                propGroup.getChildByName('num').getComponent(cc.Label).string = `${data.name}`;
                break;
            case 4:
                propGroup.getChildByName('debris').getComponent(cc.Sprite).spriteFrame = data.rewardIcon;
                propGroup.getChildByName('debris2').getComponent(cc.Sprite).spriteFrame = data.rewardIcon2;
                propGroup.getChildByName('num').getComponent(cc.Label).string = `${data.name}`;
                propGroup.getChildByName('num2').getComponent(cc.Label).string = `${data.name2}`;
                break;
            case 1:
                propGroup.getChildByName('debris').getComponent(cc.Sprite).spriteFrame = data.rewardIcon;
                propGroup.getChildByName('name').getComponent(cc.Label).string = `${data.name}`;
                propGroup.getChildByName('dec').getComponent(cc.Label).string = `${data.doc}`;
                break;
            default:
                break;
        }

        let handle = this.node.getChildByName("handle");
        handle.getChildByName("btn")?.on("click", (e) => {
            SetCom.shareFriend(
                {
                    success: (_res) => {
                        console.log(e);
                        e.node.active = false
                        switch (type) {
                            case 2:
                                propGroup.getChildByName('num').getComponent(cc.Label).string = `x${data.rewardNum * 2}`;
                                break;
                            case 3:
                                propGroup.getChildByName('num').getComponent(cc.Label).string = `${data.name.replace('x' + data.rewardNum, 'x' + data.rewardNum * 2)}`;
                                break;
                            case 4:
                                propGroup.getChildByName('num').getComponent(cc.Label).string = `${data.name.replace('x' + data.rewardNum, 'x' + data.rewardNum * 2)}`;
                                propGroup.getChildByName('num2').getComponent(cc.Label).string = `${data.name2.replace('x' + data.rewardNum2, 'x' + data.rewardNum2 * 2)}`;
                                break;
                            default:
                                break;
                        }
                        this.receiveClick(data, 1)
                        if (fn) fn();
                        console.log(SetCom.global_prop, '双倍', '111111')
                    },
                })

        });
        handle.getChildByName("label")?.once("click", () => {
            this.receiveClick(data, 1)
            if (fn) fn();
            this.node.destroy()
            console.log(SetCom.global_prop)
        });
    }
    receiveClick(data, num = 1) {
        switch (data.curState) {
            case 1:
                SetCom.global_prop.backOff += (data.rewardNum * num)
                break;
            case 2:
                SetCom.global_prop.reset += (data.rewardNum * num)
                break;
            case 3:
                SetCom.global_prop.testTube += (data.rewardNum * num)
                break;
            case 4:
                SetCom.global_prop.fragment += (data.rewardNum * num)
                break;
            case 5:
                SetCom.global_prop.physicalStrength += (data.rewardNum * num)
                break;
            default:
                break;
        }
        if (!data.curState2) {
            return
        }
        switch (data.curState2) {
            case 1:
                SetCom.global_prop.backOff += (data.rewardNum * num)
                break;
            case 2:
                SetCom.global_prop.reset += (data.rewardNum * num)
                break;
            case 3:
                SetCom.global_prop.testTube += (data.rewardNum * num)
                break;
            case 4:
                SetCom.global_prop.fragment += (data.rewardNum * num)
                break;
            case 5:
                SetCom.global_prop.physicalStrength += (data.rewardNum * num)
                break;
            default:
                break;
        }
    }
    start() {
        this.node.getChildByName("opc").opacity = 191.25
    }

}
