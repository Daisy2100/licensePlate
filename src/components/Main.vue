<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto">
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="license" prepend-icon="fa:fas fa-car" label="請輸入數字車牌"
            :rules="[value => isValidLicense(value) || '車牌必須為數字']" class="text-field">
          </v-text-field>
        </v-col>

        <v-col cols="6" class="mt-3">
          <v-btn variant="outlined" color="indigo" @click="click_start()">
            開始分析
          </v-btn>
        </v-col>

        <v-col cols="12" v-if="isStart">
          <v-card class="tab-item" elevation="8">
            <v-tabs v-model="tab" bg-color="indigo">
              <v-tab value="1">
                <v-icon icon="fa:fas fa-book" class="mr-3"></v-icon>{{ tabs[0] }}
              </v-tab>
              <!-- <v-tab value="2"><v-icon icon="fa:fas fa-hashtag" class="mr-3"></v-icon>
                {{ tabs[1] }}</v-tab> -->
            </v-tabs>
            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="1">
                  <YiJing :license="license"></YiJing>
                </v-tabs-window-item>

                <!-- <v-tabs-window-item value="2">
                  {{ tabs[1] }}
                </v-tabs-window-item> -->
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import YiJing from './YiJing.vue';

const license = ref<string>('');
const tab = ref<string>('1'); // 預設為第一個標籤
const tabs = ref<string[]>([
  '車牌吉凶分析',
  // '其餘分析模式'
]);

// 驗證車牌號碼是否為數字
const isValidLicense = (value: string) => {
  return /^[0-9]+$/.test(value); // 正則表達式檢查是否為數字
};

const isStart = ref<boolean>(false);
const click_start = () => {
    isStart.value = true;
}

</script>

<style scoped>
.text-field .v-input__control .v-input__slot {
  font-size: 1.2rem;
  /* 調整輸入框文字大小 */
}

.text-field .v-input__label {
  font-size: 1.2rem;
  /* 調整標籤文字大小 */
}

.text-field .v-input__messages {
  font-size: 1rem;
  /* 調整錯誤信息大小 */
}

.tab-item {
  border: 1px slategray solid;
}
</style>
