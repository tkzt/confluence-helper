<template>
  <div
    style="
        width: 100vw;
        display: flex;
        justify-content: center;
        height: 15vh;
        align-items: center;
        border-bottom: thin solid rgba(0, 0, 0, .1)
  ">
    <div>
        <button @click="router.go(-1)" class="back-button">
            Back
        </button>
        <button @click="selectMdAndConvert" :class="{disabled: loading}">
            Select File
        </button>
        <button
            @click="copy"
            :class="{disabled: loading || mdNotSelected, 'copied-button': copied}"
            class="copy-button"
        >
            Copy
        </button>
    </div>
  </div>
  <div style="width: 100vw; display: flex; justify-content: center">
    <div v-if="loading" class="loading">
      <bar-loading />
    </div>
    <div v-else-if="mdNotSelected" style="text-align: left; width: 600px; padding: 24px">
        <div>STEPS:</div>
        <div>1. Click on select-file-button to select markdown</div>
        <div>2. Wait for converting finished</div>
        <div>
            3. Click on copy-button to copy HTML and then go to confluence
        </div>
        <div>
            4. Paste with the extension <strong>mdToConf</strong>
        </div>
    </div>
    <div
        v-else
        ref="resultRef"
        style="text-align: left; width: 600px; font-family: Avenir, Helvetica, Arial, sans-serif"
    ></div>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it';
import { getHighlighter, setCDN } from 'shiki';
import customizedStyle from '@/assets/customized-style.json';
import { nextTick, ref } from 'vue';
import BarLoading from '@/components/BarLoading.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const resultRef = ref(null);
const loading = ref(false);
const mdNotSelected = ref(true);
const copied = ref(false);

async function md2Html(mdStr) {
  loading.value = true;
  setCDN('https://cdn.jsdelivr.net/npm/shiki/');

  // get all langs needed
  const langs = [];
  new MarkdownIt({
    html: true,
    highlight(_, lang) {
      langs.push(lang);
      return '';
    },
  }).render(mdStr);

  const highlighter = await getHighlighter({
    theme: 'github-light',
    langs,
  });
  const md = new MarkdownIt({
    html: true,
    highlight(str, lang) {
      try {
        return highlighter.codeToHtml(str, { lang });
      } catch (err) {
        console.error(err);
        return '';
      }
    },
  });

  loading.value = false;

  nextTick(() => {
    resultRef.value.innerHTML = md.render(mdStr);
    Object.entries(customizedStyle).forEach(([key, value]) => {
      Array.from(resultRef.value.querySelectorAll(key)).forEach((elem) => {
        elem.style = value;
      });
    });
    Array.from(resultRef.value.querySelectorAll('img')).forEach((elem) => {
      elem.style.maxWidth = '100%';
    });
  });
}

function selectMdAndConvert() {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();
  input.onchange = (ev) => {
    mdNotSelected.value = false;
    const [file] = ev.target.files;
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (ev_) => {
      md2Html(ev_.target.result);
    };
  };
}

function copy() {
  navigator.clipboard.writeText(resultRef.value.innerHTML);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<style scoped>
.loading {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-button {
  background-color: rgb(154, 139, 206);
}
.copy-button {
    position: relative;
    overflow: visible;
}
.copied-button::after {
  content: 'Copied!';
  position: absolute;
  background-color: rgba(0, 0, 0, .87);
  padding: 4px 8px;
  border-radius: 4px;
  top: 0;
  right: -90px;
}
</style>
