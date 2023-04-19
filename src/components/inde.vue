<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 定义表格数据
const tableData = ref([])

// 定义表单数据
const formData = ref({})

// 获取表格数据
const getTableData = async () => {
  try {
    // 发送请求获取数据
    const res = await fetch('/api/user')
    const data = await res.json()
    tableData.value = data
  } catch (error) {
    console.error(error)
    ElMessage.error('获取数据失败')
  }
}

// 新增用户
const addUser = async () => {
  try {
    // 发送请求新增用户
    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(formData.value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    ElMessage.success('新增用户成功')
    // 重新获取表格数据
    getTableData()
  } catch (error) {
    console.error(error)
    ElMessage.error('新增用户失败')
  }
}

// 修改用户
const editUser = async (id) => {
  try {
    // 发送请求修改用户
    await fetch(`/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData.value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    ElMessage.success('修改用户成功')
    // 重新获取表格数据
    getTableData()
  } catch (error) {
    console.error(error)
    ElMessage.error('修改用户失败')
  }
}

// 删除用户
const deleteUser = async (id) => {
  try {
    // 发送请求删除用户
    await fetch(`/api/user/${id}`, {
      method: 'DELETE'
    })
    ElMessage.success('删除用户成功')
    // 重新获取表格数据
    getTableData()
  } catch (error) {
    console.error(error)
    ElMessage.error('删除用户失败')
  }
}

// 表格列配置
const columns = [
  {
    label: '姓名',
    prop: 'name'
  },
  {
    label: '年龄',
    prop: 'age'
  },
  {
    label: '性别',
    prop: 'gender'
  },
  {
    label: '操作',
    width: '200',
    render: (row) => {
      return (
        <>
          <el-button type="primary" size="small" onClick={() => editUser(row.id)}>
            编辑
          </el-button>
          <el-button type="danger" size="small" onClick={() => deleteUser(row.id)}>
            删除
          </el-button>
        </>
      )
    }
  }
]

// 页面加载时获取表格数据
getTableData()
</script>

<template>
  <div>
    <!-- 表单 -->
    <el-form :model="formData" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formData.age"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formData.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" :columns="columns"></el-table>
  </div>
</template>
