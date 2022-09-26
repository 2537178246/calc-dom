<script setup lang="ts">
import {ref} from 'vue'
import {ElMessage} from 'element-plus'

interface PgwBound {
  minLon: number
  maxLon: number
  minLat: number
  maxLat: number
}

interface Point {
  x: number
  y: number
}

const textarea = ref<any>('')
const domWidth = ref<any>(null)
const domHeight = ref<any>(null)
const pgw = ref<any>('')
const crsEnum = ref<string>('EPSG_4326')

const getPgwBound = (imgWidth: number, imgHeight: number, pgwArray: number[]) => {
  const bound: PgwBound = {
    minLon: 0,
    maxLon: 0,
    minLat: 0,
    maxLat: 0
  }
  bound.minLon = pgwArray[4]
  bound.maxLon = pgwArray[4] + imgWidth * pgwArray[0]
  bound.minLat = pgwArray[5] + imgHeight * pgwArray[3]
  bound.maxLat = pgwArray[5]
  if (crsEnum.value === 'EPSG_3857') {
    const minLonLat = mercator2LonLat(bound.minLon, bound.minLat)
    const maxLonLat = mercator2LonLat(bound.maxLon, bound.maxLat)
    bound.minLon = minLonLat.x
    bound.minLat = minLonLat.y
    bound.maxLon = maxLonLat.x
    bound.maxLat = maxLonLat.y
  }
  return bound
}
const mercator2LonLat = (x: number, y: number): Point => {
  const point: Point = {
    x: 0,
    y: 0
  }
  point.x = x / 20037508.34 * 180
  point.y = y / 20037508.34 * 180
  point.y = 180 / Math.PI * (2 * Math.atan(Math.exp(point.y * Math.PI / 180)) - Math.PI / 2)
  return point
}
const getPgw = () => {
  try {
    const width = domWidth.value * 1
    const height = domHeight.value * 1
    const arr = textarea.value.split('\n').map((item: any) => item * 1)
    const {minLon, maxLon, minLat, maxLat} = getPgwBound(width, height, arr)
    pgw.value = `[[${minLat}, ${minLon}], [${maxLat}, ${maxLon}]]`
  } catch (e) {
    ElMessage.error(`${e}`)
  }
}

</script>

<template>
  <div class="input">
    <el-select v-model="crsEnum" size="mini" style="float: left;margin-bottom: 1%" class="my-2">
      <el-option label="EPSG_4326" value="EPSG_4326"></el-option>
      <el-option label="EPSG_3857" value="EPSG_3857"></el-option>
    </el-select>
    <el-input
      v-model="textarea"
      :rows="8"
      type="textarea"
      placeholder="请将输入pgw文件"
    />
    <el-input v-model="domWidth" placeholder="请输入长度" type="number"/>
    <el-input v-model="domHeight" placeholder="请输入宽度" type="number"/>
    <div style="margin-top: 1%;display: flex;align-items: center">
      <el-button type="primary" plain style="margin-right: 1%" @click="getPgw" size="mini">导出</el-button>
      <el-input v-model="pgw"/>
    </div>
  </div>
  <div class="waifu live2">
    <div class="waifu-tips"></div>
    <canvas id="live2d" class="live2d"></canvas>
    <div class="waifu-tool">
      <span class="fui-home"></span>
      <span class="fui-chat"></span>
      <span class="fui-eye"></span>
      <span class="fui-user"></span>
      <span class="fui-photo"></span>
      <span class="fui-info-circle"></span>
      <span class="fui-cross"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.live2 {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.input {
  margin: 0 auto;
  padding-top: 2%;
  width: 30%;

  :deep(.el-input) {
    margin-top: 1%;
    color: #fff;

    .el-input__inner {
      background: transparent;
      color: #fff;
      //color: #FFFFFF;
    }

  }

  :deep(.el-textarea__inner) {
    background: transparent;
    color: #fff;
  }

  :deep(.el-button) {
    //background: transparent;
    padding: 0 10px;
    height: 40px;
  }
}
</style>

<style>
html {
  background: #608dcc;
}
</style>
