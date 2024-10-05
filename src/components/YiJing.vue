<template>

  <v-card variant="outlined" class="mb-3 mt-3 text-h6">
    <template v-slot:title>
      <span class="font-weight-black">加總分析模式</span>
    </template>
    <template v-slot:subtitle>
      <span class="font-weight-black">依照所有數字做判斷</span>
      <a class="ml-2" href="http://www.chaostec.com/destiny.htm" target="_blank">資料來源</a>
    </template>
    <v-card-item class="bg-light pt-4">

      <div>
        <p>吉凶預測：
          <span :class="totalMappings[totalNumber.number]?.type ? 'text-red' : 'text-block'">
            {{ totalMappings[totalNumber.number]?.flag }} ({{ totalNumber.number }})
          </span>
        </p>
        <p>吉凶分析：{{ totalMappings[totalNumber.number]?.carDesc }}</p>
      </div>
    </v-card-item>
  </v-card>

  <v-card variant="outlined" class="mb-3 mt-3 text-h6">
    <template v-slot:title>
      <span class="font-weight-black">末兩碼分析模式</span>
    </template>
    <template v-slot:subtitle>
      <span class="font-weight-black">依照車牌末兩碼分析</span>
      <a class="ml-2" href="http://mamecool.com/lifeDNA.htm" target="_blank">資料來源</a>
    </template>

    <v-card-item class="bg-light pt-4">
      <div>
        <p>吉凶預測：
          <span :class="totalMappings[finalTwoNumber.number]?.type ? 'text-red' : 'text-block'">
            {{ totalMappings[finalTwoNumber.number]?.flag }} ({{ finalTwoNumber.number }})
          </span>
        </p>
        <p>吉凶分析：{{ totalMappings[finalTwoNumber.number]?.carDesc }}</p>
      </div>
    </v-card-item>
  </v-card>

  <v-card variant="outlined" class="mb-3 mt-3 text-h6">
    <template v-slot:title>
      <span class="font-weight-black">易經分析模式</span>
    </template>
    <template v-slot:subtitle>
      <span class="font-weight-black">依照易經研究結果</span>
      <a class="ml-2" href="http://mamecool.com/lifeDNA.htm" target="_blank">資料來源</a>
    </template>
    <v-card-item class="bg-light pt-4">
      <div>
        <v-list lines="three" density="compact">
          <v-list-item v-for="(result, index) in analysisResult" :key="index" rounded="xl">
            <template v-slot:prepend>
              <v-icon :color="result.meaning?.type ? 'primary' : 'red'"
                :icon="result.meaning?.type ? 'fa:fas fa-check' : 'fa:fas fa-exclamation'"></v-icon>
            </template>
            <template v-slot:title>
              {{ result.meaning?.title }} ({{ result.number}})
            </template>
            <template v-slot:subtitle>
              {{ result.meaning?.subtitle }}
            </template>

            <p class="h-6 text-block">{{ result.meaning?.carDesc }}</p>
          </v-list-item>
        </v-list>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';

const props = defineProps({
  license: { type: String, required: true },
});

const analysisResult = ref<{ number: any; meaning: any; tags: string[] }[]>([]);
const finalTwoNumber = ref<{ number: any; meaning: any; tags: string[] }>({
  number: '',
  meaning: null,
  tags: []
});
const totalNumber = ref<{ number: any; meaning: any; tags: string[] }>({
  number: '',
  meaning: null,
  tags: []
});

const numberMappings: { [key: number]: string } = {
  11: '伏位', 22: '伏位', 33: '伏位', 44: '伏位', 66: '伏位', 77: '伏位', 88: '伏位', 99: '伏位',
  19: '延年', 26: '延年', 34: '延年', 43: '延年', 62: '延年', 78: '延年', 87: '延年', 91: '延年',
  14: '生氣', 28: '生氣', 39: '生氣', 41: '生氣', 67: '生氣', 76: '生氣', 82: '生氣', 93: '生氣',
  13: '天醫', 27: '天醫', 31: '天醫', 49: '天醫', 68: '天醫', 72: '天醫', 86: '天醫', 94: '天醫',
  17: '禍害', 23: '禍害', 32: '禍害', 46: '禍害', 64: '禍害', 71: '禍害', 89: '禍害', 98: '禍害',
  16: '六煞', 29: '六煞', 38: '六煞', 47: '六煞', 61: '六煞', 74: '六煞', 83: '六煞', 92: '六煞',
  12: '絕命', 21: '絕命', 37: '絕命', 48: '絕命', 69: '絕命', 73: '絕命', 84: '絕命', 96: '絕命',
  18: '五鬼', 24: '五鬼', 36: '五鬼', 42: '五鬼', 63: '五鬼', 79: '五鬼', 81: '五鬼', 97: '五鬼',
};

const meanings: { [key: string]: any } = {
  '伏位': {
    title: '伏位',
    subtitle: '等待、臥虎藏龍、蓄勢待發等意義',
    carDesc: '如果車主是伏位命格，又用伏位車牌，往往是事業或戀情停滯不前',
    type: true,
  },
  '延年': {
    title: '延年',
    subtitle: '生命力強、獨當一面、綿綿不斷等意義',
    carDesc: '事業及生活順利',
    type: true,
  },
  '生氣': {
    title: '生氣',
    subtitle: '新的轉機、貴人相助、豁然開朗等意義',
    carDesc: '',
    type: true,
  },
  '天醫': {
    title: '天醫',
    subtitle: '代表財富、與生俱來的智慧等意義',
    carDesc: '',
    type: true,
  },
  '禍害': {
    title: '禍害',
    subtitle: '常受身體病痛所擾、或常有口舌之爭等意義',
    carDesc: '不分親疏，易與他人發生口角',
    type: false,
  },
  '六煞': {
    title: '六煞',
    subtitle: '人際關係不佳、感情不順利等意義',
    carDesc: '已婚者易與家人衝突，未婚者多半在車內與自己人爭吵',
    type: false,
  },
  '絕命': {
    title: '絕命',
    subtitle: '起伏波動大、非富即貧、常有意外或官司糾紛等意義',
    carDesc: '車主喜直線，會有意外發生',
    type: false,
  },
  '五鬼': {
    title: '五鬼',
    subtitle: '特立獨行、難以捉摸、不循正軌等意義',
    carDesc: '車主喜蛇行，易有血光之災，易被破壞',
    type: false
  },
};

// 在車牌號碼改變時自動分析
const analyze_license = () => {
  const license = props.license;

  const numbers = split_license(license);
  const results = numbers.map((num) => {
    const meaningKey = numberMappings[+num];
    const tags: string[] = [];

    // 如果找到對應的意義，將其標籤加入到 tags 中
    if (meanings[meaningKey]) {
      tags.push(meaningKey);
    }

    return {
      number: num.toString(),
      meaning: meanings[meaningKey] || '未知',
      tags,
    };
  });

  const filteredResults = results.filter((item) => item.tags.length !== 0);

  analysisResult.value = filteredResults;

  analyze_two_number();
  analyze_total_number();
};

const analyze_two_number = () => {
  const license = props.license;

  const numberString = license.substr(license.length-2);

  const meaningKey = numberMappings[+numberString];
  const tags: string[] = [];

  tags.push(meaningKey);

  finalTwoNumber.value = {
    number: numberString,
    meaning: meanings[meaningKey] || '未知',
    tags
  }
};

const analyze_total_number = () => {
  const license = props.license;

  // 將 license 中的每個字符轉成數字並加總
  const numberString = license
    .split('')
    .map((char) => parseInt(char, 10))
    .filter((num) => !isNaN(num)) // 過濾掉非數字字符
    .reduce((sum, num) => sum + num, 0); // 累加所有數字

  const meaningKey = numberMappings[+numberString];
  const tags: string[] = [];

  // 將 meaningKey 加入 tags
  if (meaningKey) {
    tags.push(meaningKey);
  }

  totalNumber.value = {
    number: numberString,
    meaning: meanings[meaningKey] || '未知',
    tags,
  };
};

const split_license = (input: string): number[] => {
  const digits = input.replace(/\D/g, '').split('');
  const pairs: number[] = [];
  for (let i = 0; i < digits.length - 1; i++) {
    pairs.push(parseInt(digits[i] + digits[i + 1], 10));
  }
  return pairs;
};

onMounted(()=>{
  analyze_license();
})

watch(() => props.license, (newValue) => {
  analyze_license();
});


const totalMappings: { [key: number]: { title: string; carDesc: string; type: boolean; flag: string; } } = {
  1: {
    title: '1',
    carDesc: '繁榮發達，信用得固，萬人仰望，可獲成功',
    type: true,
    flag: '吉',
  },
  2: {
    title: '2',
    carDesc: '動搖不安，一榮一枯，一盛一衰，勞而無功',
    type: false,
    flag: '凶',
  },
  3: {
    title: '3',
    carDesc: '立身出世，有貴人助，天賜吉祥，四海名揚',
    type: true,
    flag: '吉',
  },
  4: {
    title: '4',
    carDesc: '日被雲遮，苦難折磨，非有毅力，難望成功',
    type: false,
    flag: '凶',
  },
  5: {
    title: '5',
    carDesc: '陰陽和合，精神惀快，榮譽達利，一門興隆',
    type: true,
    flag: '吉',
  },
  6: {
    title: '6',
    carDesc: '萬寶集門，天降幸運，立志奮發，得成大功',
    type: true,
    flag: '吉',
  },
  7: {
    title: '7',
    carDesc: '精力旺盛，頭腦明敏，排除萬難，必獲成功',
    type: true,
    flag: '吉',
  },
  8: {
    title: '8',
    carDesc: '努力發達，貫徹志望，不忘進退，可期成功',
    type: true,
    flag: '吉',
  },
  9: {
    title: '9',
    carDesc: '雖抱奇才，有才無命，獨營無力，財利難望',
    type: false,
    flag: '凶',
  },
  10: {
    title: '10',
    carDesc: '烏雲遮月，暗淡無光，空費心力，徒勞無功',
    type: false,
    flag: '凶',
  },
  11: {
    title: '11',
    carDesc: '草木逢春，枝葉沾露，穩建著實，必得人望',
    type: true,
    flag: '吉',
  },
  12: {
    title: '12',
    carDesc: '薄弱無力，孤立無援，外祥內苦，謀事難成',
    type: false,
    flag: '凶',
  },
  13: {
    title: '13',
    carDesc: '天賦吉運，能得人望，善用智慧，必獲成功',
    type: true,
    flag: '吉',
  },
  14: {
    title: '14',
    carDesc: '忍得苦難，必有後福，是成是敗，惟靠堅毅',
    type: false,
    flag: '凶',
  },
  15: {
    title: '15',
    carDesc: '謙恭做事，外得人和，大事成就，一門興隆',
    type: true,
    flag: '吉',
  },
  16: {
    title: '16',
    carDesc: '能獲眾望，成就大業，名利雙收，盟主四方',
    type: true,
    flag: '吉',
  },
  17: {
    title: '17',
    carDesc: '排除萬難，有貴人助，把握時機，可得成功',
    type: true,
    flag: '吉',
  },
  18: {
    title: '18',
    carDesc: '經商做事，順利昌隆，如能慎始，百事亨通',
    type: true,
    flag: '吉',
  },
  19: {
    title: '19',
    carDesc: '成功雖早，慎防虧空，內外不和，障礙重重',
    type: false,
    flag: '凶',
  },
  20: {
    title: '20',
    carDesc: '智高志大，歷盡艱難，焦心憂勞，進退兩難',
    type: false,
    flag: '凶',
  },
  21: {
    title: '21',
    carDesc: '先歷困苦，後得幸福，霜雪梅花，春來怒放',
    type: true,
    flag: '吉',
  },
  22: {
    title: '22',
    carDesc: '秋草逢霜，懷才不遇，憂愁怨苦，事不如意',
    type: false,
    flag: '凶',
  },
  23: {
    title: '23',
    carDesc: '旭日昇天，名顯四方，漸次進展，終成大業',
    type: true,
    flag: '吉',
  },
  24: {
    title: '24',
    carDesc: '錦繡前程，須靠自力，多用智謀，能奏大功',
    type: true,
    flag: '吉',
  },
  25: {
    title: '25',
    carDesc: '天時地利，只久人和，講信修睦，即可成功',
    type: true,
    flag: '吉',
  },
  26: {
    title: '26',
    carDesc: '波瀾起伏，千變萬化，凌駕萬難，必可成功',
    type: false,
    flag: '凶',
  },
  27: {
    title: '27',
    carDesc: '一成一敗，一盛一衰，惟靠謹慎，可守成功',
    type: true,
    flag: '吉',
  },
  28: {
    title: '28',
    carDesc: '魚臨旱地，難逃惡運，此數大凶，不如更名',
    type: false,
    flag: '凶帶吉',
  },
  29: {
    title: '29',
    carDesc: '如龍得雲，青雲直上，智謀奮進，才略奏功',
    type: true,
    flag: '吉帶凶',
  },
  30: {
    title: '30',
    carDesc: '吉凶參半，得失相伴，投機取巧，如賭一樣',
    type: true,
    flag: '吉帶凶',
  },
  31: {
    title: '31',
    carDesc: '此數大吉，名利雙收，漸進向上，大業成就',
    type: true,
    flag: '吉',
  },
  32: {
    title: '32',
    carDesc: '池中之龍，風雲際會，一躍上天，成功可望',
    type: true,
    flag: '吉',
  },
  33: {
    title: '33',
    carDesc: '意氣用事，人和必失，如能慎始，必可昌隆',
    type: true,
    flag: '吉',
  },
  34: {
    title: '34',
    carDesc: '災難不絕，難望成功，此數大凶，不如更名',
    type: false,
    flag: '凶',
  },
  35: {
    title: '35',
    carDesc: '處事嚴謹，進退保守，學智兼具，成就非凡',
    type: true,
    flag: '吉',
  },
  36: {
    title: '36',
    carDesc: '波瀾重疊，常陷窮困，動不如靜，有才無命',
    type: false,
    flag: '凶',
  },
  37: {
    title: '37',
    carDesc: '逢凶化吉，吉人天相，以聽取眾，必成大功。',
    type: true,
    flag: '吉',
  },
  38: {
    title: '38',
    carDesc: '名雖可得，利財難獲，藝界發展，可望成功。',
    type: false,
    flag: '凶帶吉',
  },
  39: {
    title: '39',
    carDesc: '雲開見月，雖有勞碌，光明坦途，指日可期。',
    type: true,
    flag: '吉',
  },
  40: {
    title: '40',
    carDesc: '一盛一衰，浮沉不定，知難而退，自獲天佑。',
    type: true,
    flag: '吉帶凶',
  },
  41: {
    title: '41',
    carDesc: '天賦吉運，德望兼備，繼續努力，前途無限。',
    type: true,
    flag: '吉',
  },
  42: {
    title: '42',
    carDesc: '事業不專，十九不成，專心不取，可望成功。',
    type: true,
    flag: '吉帶凶',
  },
  43: {
    title: '43',
    carDesc: '雨夜之花，外祥內苦，忍耐自重，轉凶為吉。',
    type: true,
    flag: '吉帶凶',
  },
  44: {
    title: '44',
    carDesc: '難用心計，事難遂願，貪功好進，必招失敗。',
    type: false,
    flag: '凶',
  },
  45: {
    title: '45',
    carDesc: '楊柳遇春，綠葉發枝，衝破難關，一舉成名。',
    type: true,
    flag: '吉',
  },
  46: {
    title: '46',
    carDesc: '坎坷不平，艱難重重，若無耐心，難望有成。',
    type: false,
    flag: '凶',
  },
  47: {
    title: '47',
    carDesc: '有貴人助，可成大業，雖遇不幸，浮沉不大。',
    type: true,
    flag: '吉',
  },
  48: {
    title: '48',
    carDesc: '美花豐實，鶴立雞群，名利俱全，繁榮富貴。',
    type: true,
    flag: '吉',
  },
  49: {
    title: '49',
    carDesc: '遇吉則吉，遇凶則凶，唯靠謹慎，逢凶化吉。',
    type: false,
    flag: '凶(吉帶凶)',
  },
  50: {
    title: '50',
    carDesc: '吉凶互見，一成一敗，凶中自吉，吉中有凶。',
    type: true,
    flag: '吉帶凶',
  },
  51: {
    title: '51',
    carDesc: '一盛一衰，浮沉不常，自重而處，可保平安。',
    type: false,
    flag: '吉帶凶(凶)',
  },
  52: {
    title: '52',
    carDesc: '草木逢春，雨過天晴，渡過難關，即獲成功。',
    type: true,
    flag: '吉',
  },
  53: {
    title: '53',
    carDesc: '盛衰參半，外祥內苦，先吉後凶，先凶後吉。',
    type: true,
    flag: '吉帶凶',
  },
  54: {
    title: '54',
    carDesc: '雖傾全力，難望成功，此數大凶，最好改名。',
    type: false,
    flag: '凶',
  },
  55: {
    title: '55',
    carDesc: '外觀隆昌，內隱外患，克服難關，開出泰運。',
    type: true,
    flag: '吉帶凶',
  },
  56: {
    title: '56',
    carDesc: '事與願違，終難成功，欲速不達，有始無終。',
    type: false,
    flag: '凶',
  },
  57: {
    title: '57',
    carDesc: '雖有困難，時來運轉，曠野枯草，春來花開。',
    type: false,
    flag: '凶帶吉',
  },
  58: {
    title: '58',
    carDesc: '半凶半吉，浮吉多端，始凶終吉，能保成功。',
    type: true,
    flag: '吉帶凶',
  },
  59: {
    title: '59',
    carDesc: '遇事猶豫，難望成事，大刀闊斧，始可有成。',
    type: false,
    flag: '凶',
  },
  60: {
    title: '60',
    carDesc: '黑暗無吉，心迷意亂，出爾反爾，難定方針。',
    type: false,
    flag: '凶',
  },
  61: {
    title: '61',
    carDesc: '雲遮半月，內隱風波，應自謹慎，始保平安。',
    type: true,
    flag: '吉帶凶',
  },
  62: {
    title: '62',
    carDesc: '煩惱懊悔，事業難成，自防災禍，始免困境。',
    type: false,
    flag: '凶',
  },
  63: {
    title: '63',
    carDesc: '萬物化育，繁榮之象，專心一意，必能成功。',
    type: true,
    flag: '吉',
  },
  64: {
    title: '64',
    carDesc: '見異思遷，十九不成，徒勞無功，不如更名。',
    type: false,
    flag: '凶',
  },
  65: {
    title: '65',
    carDesc: '吉運自來，能享盛名，把握機會，必獲成功。',
    type: true,
    flag: '吉',
  },
  66: {
    title: '66',
    carDesc: '黑夜逝長，進退維谷，內外不和，信用缺乏。',
    type: false,
    flag: '凶',
  },
  67: {
    title: '67',
    carDesc: '獨營事業，事事如意，功成名就，富貴自來。',
    type: true,
    flag: '吉',
  },
  68: {
    title: '68',
    carDesc: '思慮周詳，計劃力行，不失先機，可望成功。',
    type: true,
    flag: '吉',
  },
  69: {
    title: '69',
    carDesc: '動搖不安，常陷逆境，不得時運，難得利潤。',
    type: false,
    flag: '凶',
  },
  70: {
    title: '70',
    carDesc: '慘淡經營，難免貧困，此數不吉，最好改名。',
    type: false,
    flag: '凶',
  },
  71: {
    title: '71',
    carDesc: '吉凶參半，唯賴勇氣，貫徹力行，始可成功。',
    type: false,
    flag: '吉帶凶',
  },
  72: {
    title: '72',
    carDesc: '利害混集，凶多吉少，得而復失，難以安順。',
    type: false,
    flag: '凶',
  },
  73: {
    title: '73',
    carDesc: '安樂自來，自然吉祥，力行不懈，必能成功。',
    type: true,
    flag: '吉(吉帶凶)',
  },
  74: {
    title: '74',
    carDesc: '利不及貴，坐食山空，如無智謀，難望成功。',
    type: false,
    flag: '凶',
  },
  75: {
    title: '75',
    carDesc: '吉中帶凶，欲速不達，進不如守，可保安詳。',
    type: true,
    flag: '吉帶凶',
  },
  76: {
    title: '76',
    carDesc: '此數為凶，破產之象，宜速改名，以避厄運。',
    type: false,
    flag: '凶',
  },
  77: {
    title: '77',
    carDesc: '先苦後甘，先甘後苦，如能守成，不致失敗。',
    type: true,
    flag: '吉帶凶',
  },
  78: {
    title: '78',
    carDesc: '有得有失，華而不實，需防劫財，始保安順。',
    type: true,
    flag: '吉帶凶',
  },
  79: {
    title: '79',
    carDesc: '如走夜路，前途無光，希望不大，勞而無功。',
    type: false,
    flag: '凶',
  },
  80: {
    title: '80',
    carDesc: '得而復失，枉費心機，守成無貪，可保安穩。',
    type: true,
    flag: '吉帶凶',
  },
  81: {
    title: '81',
    carDesc: '最極之數，還本歸元，能得繁榮，發達成功。',
    type: true,
    flag: '吉',
  }
};



</script>

<style scoped>
.text-field .v-input__control .v-input__slot {
  font-size: 1.2rem; /* 調整輸入框文字大小 */
}

.text-field .v-input__label {
  font-size: 1.2rem; /* 調整標籤文字大小 */
}

.text-field .v-input__messages {
  font-size: 1rem; /* 調整錯誤信息大小 */
}
</style>
