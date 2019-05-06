<template>
  <div class="user_body">
    <header-view :titles="'用户须知及风险提示'">
    </header-view>
    <div class="mint-content agreement_view">
      <div class="part1">
        <div class="pt_header">
          <p>《用户须知以及风险提示》</p>
        </div>
        <div class="pt_content">
          <p class="p1">您在开始交易前，请审阅下述风险提示，理解其中各项说明。</p>
          <h3 class="p2">用户须知</h3>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;一、该风险提示旨在告知您在金融市场中的交易活动存在风险。
            您必须认识到，该风险可能使您在交易过程中遭受损失。该提示仅为提供信息，
            不应被视为所有可能的风险清单。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;二、客户在参与平台交易前，须对期货工具进行系统、全面地学习与掌握;
            了解期货工具的特点，知晓该工具的风险。请在参与前详细了解期货关于特殊情况下的规定。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;三、客户参与平台交易前，请确认自己有相应风险承受能力，不建议参与超出自身承受能力范围的交易。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;四、客户参与平台交易的资金须为合法所得，不接受不明的资金参与交易。
          </p>
          <h3 class="p3">风险提示</h3>
          <h4 class="p4">1. 杠杆的使用</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;在保证金交易中，杠杆会对您的交易账户产生重大影响，即使汇率和工具价格仅发生微弱变化。
            您必须了解，如果市场趋势与您的交易方向相反，您资金发生损失的机会非常高。
            您全权负责您的资金的使用并承担全部风险。
          </p>
          <h4 class="p4">2. 金融工具的不稳定性</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;金融市场上交易的大部分工具报价可能在一天内发生巨大变化，这可能给您带来利润，也会带来损失。
          </p>
          <h4 class="p4">3. 技术风险</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;3.1 我平台对因您的电子、通讯或信息系统故障导致的经济损失不承担责任。
          </p>
          <div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;3.2 操作客户端（APP/pc）时，风险可能来自：
            </p>
            <p class="classp">
              1. 您的设备、软件和连接故障。
            </p>
            <p class="classp">
              2. 未能及时更新您的APP/PC版本。
            </p>
            <p class="classp">
              3. 您未按说明使用APP/PC。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;我方不对APP/PC操作过程中发生的错误负责，也不会对APP/PC操作过程中发生的错误所导致的损失进行赔偿。
            </p>
          </div>
          <h4 class="p4">4. 市场风险</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;如果市场状况变得异常，处理您的订单和指令所需时间可能会延长。
          </p>
          <h4 class="p4">5. 与政府法律相关的风险</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;您还需承担在交易和非交易操作被依法限制或禁止的国家执行该操作的责任。
          </p>
          <h4 class="p4">6. 与交易评估相关的风险</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;6.1 您的所有指令均发送至我方的服务器并按顺序执行。
            您可能无法撤回正在执行的指令，您应对可能已执行的任何意外交易操作承担责任。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;6.2 您必须了解，关闭APP/PC并不会撤销已提交的订单。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;6.3 您知悉，只有从我方的服务器获得的报价才具有权威性。
          </p>
          <h4 class="p4">7. 不可抗力事件</h4>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;我方对因不可抗力事件导致的风险不承担责任。
            该等事件为不受协议参与者的意志和行为支配且不能预见、阻止或消除的极端、不可抵抗情况，
            包括但不限于自然灾害、火灾、人为事故或灾害、公共工程和公共设施的突发事件，
            DDOS 攻击、暴乱、军事行动、恐怖袭击、暴动、内乱、罢工以及国家和当地政府机关的监管行为。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;以上提示可能发生的风险由投资者自行承担，投资有风险，入市需谨慎。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
export default {
  name: 'agreement',
  components: {
    HeaderView
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus">
@import './agreement.styl'
</style>
