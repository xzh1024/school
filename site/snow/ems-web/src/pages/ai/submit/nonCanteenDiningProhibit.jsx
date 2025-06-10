import { observer } from 'mobx-react';
import React, { useEffect, useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import useStores from '@s';
import { Button, Modal } from 'antd';

function Index(props) {
  const { item, type, isHistory, isDisabled } = props;
  const { answer } = item;

  const { aiSubmit } = useStores();

  const [countDownNumber, setCountDownNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {}, []);

  const onNext = value => {
    if (type === 1) {
      doNext(value);
    } else {
      doNext2(value);
    }
    if (value) {
      setCountDownNumber(3);
      setVisible(true);
    }
  };

  const getCountDownNumber = useMemo(() => {
    if (countDownNumber > 0) {
      setTimeout(() => {
        setCountDownNumber(countDownNumber - 1);
      }, 1000);
    }
    return countDownNumber;
  }, [countDownNumber]);

  const onConfirm = () => {
    if (countDownNumber > 0) return;
    setVisible(false);
    if (type === 1) {
      doConfirm();
    } else {
      doConfirm2();
    }
  };

  // 非食堂用餐-继续提报
  const doNext = value => {
    // 隐藏按钮
    aiSubmit.setMessage(item.id, {
      ...item,
      isDisabled: true,
    });
    if (!value) {
      const question = '取消';
      const answer = '取消提报。还有什么想和雪宝交流的吗？';
      aiSubmit.addContent({
        id: uuid(),
        question,
        answer,
      });
      aiSubmit.saveHistory({
        question,
        answer,
      }); // 保存历史
      aiSubmit.inputVisible = true;
      aiSubmit.businessNo = '';
    }
  };
  const doNext2 = value => {
    if (!answer.cellList) return;
    const cellList = answer.cellList;
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    if (value) {
      aiSubmit.setMessage(item.id, {
        ...item,
        answer: {
          ...item.answer,
          cellList,
        },
      });
    } else {
      cellList.push({
        id: uuid(),
        question: '取消',
      });
      const answerData = {
        ...item.answer,
        cellList,
      };
      aiSubmit.setMessage(item.id, {
        ...item,
        answer: answerData,
      });
      aiSubmit.saveHistoryJson('1', answerData); // 保存历史
    }
  };

  // 非食堂用餐-阅读并报账
  const doConfirm = () => {
    const question = '已阅读并报账';
    const answer = '你可以这样说“因商务会谈，招待内地合资合作方，招待4人，陪同2人”';
    aiSubmit.inputVisible = true;
    aiSubmit.addContent({
      id: uuid(),
      question,
      answer,
    });
    aiSubmit.saveHistory({
      question,
      answer,
    }); // 保存历史
  };
  const doConfirm2 = () => {
    const cellList = answer.cellList;
    cellList.push({
      id: uuid(),
      question: '已阅读并报账',
      templateType: 'nonCanteenDiningForm',
    });
    const answerData = {
      ...item.answer,
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistory({
      answer: JSON.stringify(answerData),
      answerType: 'json',
    });
  };

  // 非食堂用餐-继续提报询问
  return (
    <div>
      <div>
        <div>目前雪宝提报非食堂用餐事前申请暂不支持录入领酒明细，若需要领酒，请走传统事前申请提报。是否继续提报？</div>
        {isHistory || isDisabled ? (
          ''
        ) : (
          <div className="button-group mt-2">
            <Button onClick={() => onNext(false)} className="mr-2">
              取消
            </Button>
            <Button type="primary" ghost onClick={() => onNext(true)}>
              继续
            </Button>
          </div>
        )}
      </div>

      <Modal
        open={visible}
        width={800}
        footer={null}
        keyboard={false}
        maskClosable={false}
        destroyOnClose={true}
        classNames={{
          content: ['bg-transparent', 'shadow-none', 'p-0'],
        }}
        closeIcon={false}
        onCancel={() => setVisible(false)}
      >
        <div
          className="pt-5 pb-8 px-6 pb-8 rounded-xl"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #FDE3AE 0%, #ffffff 28%)',
          }}
        >
          <div className="text-[28px] text-[#333333] font-medium">食堂/非食堂用餐费禁止报销事项</div>
          <div className="ml-2 mt-6 text-base text-[#1A1C27] ai-text-markdown">
            <ol className="leading-8">
              <li>不得报销接待对象到私人会所及高档的娱乐、休闲、健身、保健等高消费场所活动的费用</li>
              <li>不得报销参加所出资企业或关联企业安排到上述场所的业务招待的费用</li>
              <li>不得报销公款购买、消费、提供高档酒水的费用(白酒每500毫升、红酒每750毫升售价不得超过500元)</li>
              <li>不得报销公款购买、消费、提供香烟的费用</li>
              <li>不得报销用野生保护动物制作的菜肴，不得报销燕窝、鱼翅等高档菜肴的费用</li>
              <li>不得报销游览门票、娱乐等与公务无关的费用；不得报销张贴宣传标语横幅的费用</li>
              <li>
                不得报销赠送现金、购物卡、会员卡、消费卡、商业预付卡和各种有价证券、支付凭证、贵重物品以及名贵土特产等费用
              </li>
              <li>不得报销接待用车的公车私用，私车公养</li>
              <li>不得报销因私招待费用、个人消费费用</li>
              <li>对外接待餐标金额含酒水费用</li>
            </ol>
          </div>
          <div className="text-right mt-1">
            <div
              className={
                countDownNumber
                  ? 'inline-block w-[200px] text-[#ffffff] text-base py-2.5 text-center rounded-md bg-[#FDE3AE] cursor-not-allowed'
                  : 'inline-block w-[200px] text-[#ffffff] text-base py-2.5 text-center rounded-md bg-[#FAAD14] cursor-pointer'
              }
              onClick={onConfirm}
            >
              已阅读并报账
              {getCountDownNumber ? <span>·{getCountDownNumber}s</span> : ''}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default observer(Index);
