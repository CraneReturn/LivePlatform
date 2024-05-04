<template>
  <div class="payMoney">
    <div class="title">
      <h3>钻石充值</h3>
      <p><i class="iconfont icon-yuebao"></i>余额 {{ cost }} 钻石</p>
    </div>
    <div class="mianRecharge">
      <div
        class="recharge"
        v-for="(item, index) in rechargeList"
        @click="payIt(item)"
      >
        <p class="payChange">
          <span>{{ payCount(item * 10) }}</span
          >钻石
        </p>
        <p class="item">
          <span class="icon">￥</span><span>{{ payCount(item) }}</span>
        </p>
      </div>
      <div class="recharge">
        <p class="payChange">自定义金额</p>
        <p class="item">最高10万元</p>
      </div>
    </div>
    <h2>扫码支付</h2>
    <div class="pay">
      <img src="@/assets/images/pay.jpg" alt="" />
      <div class="payCost">
        <p class="payable">
          应付金额 <span class="icon">￥</span
          ><span class="cost">{{ null || "--" }}</span>
        </p>
        <p><i class="iconfont icon-zhifubao"></i>推荐使用支付宝支付</p>
        <p>已阅读并同意<a>《充值协议》</a></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const rechargeList = [1, 6, 30, 98, 298, 598, 1998];
const payCount = (value) => {
  return new Intl.NumberFormat().format(value);
};
let cost = ref("0");
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4515498_19niweg4wuh.css");
.payMoney {
  background-color: #fff;
  padding: 10px;
}
.title {
  display: flex;
  align-items: center;
  gap: 10px;
  h3 {
    font-weight: 700;
    font-size: 18px;
  }
  p {
    .iconfont {
      color: #f15a4a;
      margin-right: 2px;
    }
    font-size: 13px;
    color: var(--el-color-info-light-3);
  }
}
.mianRecharge {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  .recharge {
    background-color: #f8f8f8;
    border-radius: var(--el-border-radius-base);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
    .payChange {
      font-size: 14px;
      font-weight: 600;
      span {
        margin-right: 2px;
        font-weight: 600;
      }
    }
    p {
      font-size: 14px;
    }
    .icon {
      font-size: 12px;
    }
  }
}
h2 {
  font-size: 18px;
  font-weight: 600;
}
.pay {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  p {
    font-size: 12px;
    font-weight: 100;
    color: var(--el-color-info-light-3);
  }
  .payable {
    font-size: 17px;
    font-weight: 600;
    color: #000;
  }
  .icon-zhifubao {
    color: #00a0ea;
    font-size: 12px;
    margin-right: 2px;
  }
  .icon {
    font-size: 12px;
    color: #f15a4a;
  }
  .cost {
    font-size: 20px;
    font-weight: 600;
    color: #f15a4a;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
a {
  color: var(--el-color-primary-light-3);
  cursor: pointer;
}
</style>
