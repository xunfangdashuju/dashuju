<template>
    <div>
        <div  ref="editor" style="text-align:left"></div>
        <button v-on:click="getContent">{{contextmenu}}</button>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
      name: 'editor',
      props:[ 'contextmenu' ],
      data () {
        return {
          editorContent: '',
          editor: null,
          
        }
      },
      watch: {
        contextmenu() {
          console.log('change----------')
          console.log(this.contextmenu)
          if(this.contextmenu !== undefined) {
            this.editor.txt.html(this.contextmenu)
          } else {

            this.editor.txt.html('')
          }
          
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      mounted() {
        console.log(this.contextmenu)
        var editor = new E(this.$refs.editor)
        this.editor = editor
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.$emit('change', html)
        }
        editor.create()
      }
    }
</script>

<style scoped>
</style>