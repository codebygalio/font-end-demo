<template>
  <div class="editorContainer" ref="editor"></div>
</template>

<script>

import E from 'wangeditor'
export default {
  props: {
    value: {
      type: String
    }
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor)
      editor.config.onchange = (newHtml) => {
        this.$emit('input', newHtml)
      }
      editor.create()
      editor.txt.html(this.value)
      this.$watch('value', () => {
        editor.txt.html(this.value)
      })
    }
  },
  
  mounted() {
    this.initEditor()
  }
}
</script>