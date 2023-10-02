
  <!-- <div class="cl-steps">
    <div class="cl-steps-item" :class="{active: i < 3}" v-for="i in 5" :key="i">
      <div class="step"><span>{{i}}</span></div>
      <div class="title">提交订单</div>
      <div class="desc">2021-03-18 02:11:47</div>
    </div>
  </div> -->
<script>
export default {
  name: 'ClSteps',
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach(item => {
      if (item.type.name === 'ClStepsItem') {
        dymanicItems.push(item)
      } else {
        item.children.forEach(itemChildren => {
          dymanicItems.push(itemChildren)
        })
      }
    })
    const itemsJsx = dymanicItems.map((item, i) => {
      return <div class="cl-steps-item" class={{ active: i <= this.active }}>
        <div class="step"><span>{i + 1}</span></div>
        <div class="title">{item.props.title}</div>
        <div class="desc">{item.props.desc}</div>
      </div>
    })
    return <div class="cl-steps"> {itemsJsx} </div>
  }
}
</script>
<style lang="scss">
.cl-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: $xtxColor;
          background: $xtxColor;
          color: #fff
        }
        &::before,&::after {
          background: $xtxColor;
        }
      }
      .title {
        color: $xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,&::before{
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
         left: 0;
      }
      &::after {
         right: 0;
       }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
