<template>
  <div class="content">
  <button  @click="addToCart()"  class="add-to-cart">Add to cart</button>
    <div class="top-row">
      <!-- <div class="top part" :style="headOnSaleStyle"> -->
       <div :class="[headOnSaleClass,'top', 'part']"><!-- jesli chcemy kilka klas to v-bind:class="[]"||:class="[]"-->
      <div class="robot-name">{{selectedRobot.head.title}}<!--zmiennie w komponencie zamiast textu to {{}} a jak atrybut to w ""-->
      <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span></div>
        <img v-bind:src="selectedRobot.head.src" title="head"/>
        <button v-on:click="selectPrevHead()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img v-bind:src="selectedRobot.leftArm.src" title="left arm"/>
        <button v-on:click="selectPrevLeftArm()" class="prev-selector">&#9650;</button>
        <button v-on:click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img v-bind:src="selectedRobot.torso.src" title="left arm"/>
        <button v-on:click="selectPrevTorso()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img v-bind:src="selectedRobot.rightArm.src" title="left arm"/>
        <button v-on:click="selectPrevRightArm()" class="prev-selector">&#9650;</button>
        <button v-on:click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img v-bind:src="selectedRobot.base.src" title="left arm"/>
        <button v-on:click="selectPrevBase()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <table>
    <thead><tr>
    <th>Robot</th>
    <th>Cost</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(robot,index) in cart" :key="index">
    <!--jak map w reacie , nie laczyc z condiotionalem!!-->
    <td>{{robot.selectedRobot}} : </td>
    <td>{{robot.cost}}</td>
    </tr>
    </tbody>
    </table>
  </div>
</template>
<script>
import availableParts from '../data/parts';// importy!!
import createHookMixin from './create_hook.mixin';

const getNextValidIndex = (index, length) => {
  const validIndex = index + 1;
  return validIndex > length - 1 ? 0 : validIndex;
};

const getPreviousValidIndex = (index, length) => {
  const validIndex = index - 1;
  return validIndex < 0 ? length - 1 : validIndex;
};

export default { // istead v-on:--> @; v-bind:-->://
// v-once-->cos renderuje sie tylko raz--
// performance!!useEffect([])??v-if vs v-show -->
// v-show display:none>its better when its expensive to render again
  name: 'RobotBuilder',
  mixins: [createHookMixin], // w ten spodob mozemy radzic sobie z powtarzalnym kodem
  data() { // this is how we insert data into component;when put here vue know that data is changing, app is tracking tts changes!
    return {
      availableParts,
      cart: [],
      selectHeadIndex: 0,
      selectLeftArmIndex: 0,
      selectTorsoIndex: 0,
      selectRightArmIndex: 0,
      selectBaseIndex: 0,
    };
  },
  computed: { // to avoid to much logic in the components its better to put it here1!!tu sie przelicza pewne wartości
    headOnSaleClass() {
      return this.selectedRobot.head.onSale ? 'onSale' : '';
    },
    headOnSaleStyle() {
      return {
        border: this.selectedRobot.head.onSale ? '3px solid red' : '1px solid #fff ',
      };
    },
    selectedRobot() { // zwraca obiekt
      return {
        head: availableParts.heads[this.selectHeadIndex],
        leftArm: availableParts.arms[this.selectLeftArmIndex],
        torso: availableParts.torsos[this.selectTorsoIndex],
        rightArm: availableParts.arms[this.selectRightArmIndex],
        base: availableParts.bases[this.selectBaseIndex],
      };
    },
  },
  methods: { // how to insert all foos into component,for events
    addToCart() {
      const cost = this.selectedRobot.head.cost +
      this.selectedRobot.leftArm.cost +
      this.selectedRobot.base.cost +
       this.selectedRobot.torso.cost + this.selectedRobot.rightArm.cost;
      console.log(this.cart, this.selectedRobot);
      this.cart = [...this.cart, { selectedRobot: this.selectedRobot.head.title, cost }];
      console.log(this.cart);
    },
    selectNextHead() {
      this.selectHeadIndex = getNextValidIndex(this.selectHeadIndex, availableParts.heads.length);
      console.log(this.selectHeadIndex);
    },
    selectPrevHead() {
      this.selectHeadIndex =
       getPreviousValidIndex(this.selectHeadIndex, availableParts.heads.length);
      console.log(this.selectHeadIndex);
    },
    selectNextLeftArm() {
      this.selectLeftArmIndex =
       getNextValidIndex(this.selectLeftArmIndex, availableParts.arms.length);
    },
    selectPrevLeftArm() {
      this.selectLeftArmIndex =
       getPreviousValidIndex(this.selectLeftArmIndex, availableParts.arms.length);
    },
    selectNextRightArm() {
      this.selectRightArmIndex =
      getNextValidIndex(this.selectRightArmIndex, availableParts.arms.length);
    },
    selectPrevRightArm() {
      this.selectRightArmIndex =
       getPreviousValidIndex(this.selectRightArmIndex, availableParts.arms.length);
    },
    selectNextTorso() {
      this.selectTorsoIndex =
      getNextValidIndex(this.selectTorsoIndex, availableParts.torsos.length);
    },
    selectPrevTorso() {
      this.selectTorsoIndex =
       getPreviousValidIndex(this.selectTorsoIndex, availableParts.torsos.length);
    },
    selectNextBase() {
      this.selectBaseIndex =
      getNextValidIndex(this.selectBaseIndex, availableParts.bases.length);
    },
    selectPrevBase() {
      this.selectBaseIndex =
      getPreviousValidIndex(this.selectBaseIndex, availableParts.bases.length);
    },
  },
};
</script>
<style>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part {
 img {
  width: 165px;
}
}

.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
  position: absolute;
  top: -25px;
  width:100%;
  text-align:center;
}
.sale {
  color: red;
}
.content{
  position:relative
}
.add-to-cart {
  position: absolute;
  right:30px;
  width: 200px;
  padding: 5px;
  font-size: 16px;
}
.onSale {
  border:3px solid red
}
</style>
