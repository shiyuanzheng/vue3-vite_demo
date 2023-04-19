<!-- 使用element-plus组件库渲染任务列表 -->
<template>
  <el-table :data="tableData">
    <el-table-column min-width="300" prop="name" label="任务信息">
      <template #default="{ row }">
        <div class="table-slot">
          <div style="position: relative">
            <svg-icon v-if="row.sort" icon-class="Dollar" class="top-item" />
            <el-image
              :src="row.taskIconUrl"
              :preview-src-list="[row.taskIconUrl]"
              lazy
              preview-teleported
              fit="cover"
              class="table-slot-img"
              style="width: 100px; height: 100px"
            >
              <div slot="error" class="error-image-slot">
                <i class="el-icon-picture-outline" style="font-size: 26px; line-height: 46px"></i>
              </div>
            </el-image>
          </div>
          <div class="table-slot-content">
            <h3 class="text-ellipsis">
              <img src="~@/assets/img/icon-tiktok.png" alt="" class="tiktok-icon" />
              <a class="link-jump" href="javascript:;" @click="handleDetail(row)">{{
                row.name || '--'
              }}</a>
            </h3>
            <h4 class="text-ellipsis">ID：{{ row.id }}</h4>
            <p style="margin: 0">
              {{ row.contentType || '--' }}
              {{ row.marketTarget }}
              {{ row.industryName || '--' }}
            </p>
            <h4 class="text-ellipsis">{{ row.enterpriseName || '--' }}</h4>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="奖励方式" align="center">
      <template #default="{ row }">
        {{ row.awardWay }}
      </template>
    </el-table-column>
    <el-table-column label="预算 / 消耗">
      <template #default="{ row }">
        <p style="margin: 0">预算: {{ row.totalAmount }}</p>
        消耗: {{ row.usedAmount }}
      </template>
    </el-table-column>
    <el-table-column prop="issueRange" label="达人数量" show-overflow-tooltip>
      <template #default="{ row }">
        <p style="margin: 0">需要: {{ row.partakeCount }}</p>
        <p style="margin: 0">合作: {{ row.totalEnterCount }}</p>
        完成: {{ row.totalFinishedCount }}
      </template>
    </el-table-column>
    <el-table-column
      sortable="beginDate"
      show-overflow-tooltip
      prop="startTime"
      label="推广时间"
      width="150"
      header-align="center"
      align="center"
    >
      <template #default="{ row }">
        <i class="i-dot"></i>{{ row.startTime || '--' }}<br />
        <i class="i-dot" style="background: #f5222d"></i>{{ row.endTime || '--' }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" header-align="center" align="center">
      <template #default="{ row }">
        {{ row.status }}
      </template>
    </el-table-column>
    <el-table-column
      sortable="custom"
      show-overflow-tooltip
      prop="createDate"
      label="创建人 / 创建时间"
      width="150"
      header-align="center"
      align="center"
    >
      <template #default="{ row }">
        <p style="margin: 0">{{ row.realName || '--' }}</p>
        {{ row.createDate || '--' }}
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" class-name="table-action" width="150">
      <template #default="{ row }">
        <el-button type="primary" text @click.native.prevent="handleEdit(row)">编辑</el-button>
        <el-button type="primary" text @click.native.prevent="handleDetail(row)">详情</el-button>
        <el-dropdown trigger="click" v-if="row.status !== 4 && row.status !== 5">
          <el-button type="primary" text>
            <span>更多</span>
            <el-icon class="el-icon--right"> <arrow-down /> </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="deleteHandle(row.id)">
                <el-button type="danger" text>删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="$refs.cancelTask.open(row)">
                <el-button text>取消</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="$refs.endingTask.open(row)">
                <el-button type="warning" text>提前结束</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="handleTop(row)">
                <el-button type="primary" text>置顶</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="handleTop(row)">
                <el-button type="primary" text>取消置顶</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="$refs.addBudgetModal.show(row)">
                <el-button type="primary" text>追加预算</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="$refs.addTalentModal.show(row)">
                <el-button type="primary" text>追加达人数量</el-button>
              </el-dropdown-item>
              <el-dropdown-item @click.native.prevent="$refs.taskDelayModal.show(row)">
                <el-button type="primary" text>任务延期</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
const http = inject('$http')

const tableData = ref([])

// 获取表格数据
const getTableData = async () => {
  try {
    // 发送请求获取数据
    const { data } = await http.get('task/task/page')
    tableData.value = data.list
  } catch (error) {
    throw new Error(error)
  }
}
// getTableData()

// onMounted(async () => {})
onMounted(getTableData)

const editUser = (id) => {}

const deleteUser = (id) => {}
</script>
