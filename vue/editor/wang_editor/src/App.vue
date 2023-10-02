<template>
  <div id="app">
    <WangEditor v-model="editorValue"/>
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor'
export default {
  name: 'App',
  data(){
    return {
        editorValue: '312321'
    }
  },
  components:{
    WangEditor
  }
  
}
</script>

