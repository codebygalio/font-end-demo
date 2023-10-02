<template>
    <div class="employees-container app-container">
        <page-tools>
            <span slot="before">共{{ page.total }}条记录</span>
            <template v-slot:after>
                <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
                <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
                <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
            </template>
        </page-tools>
        <el-table :data="employeeList" v-loading="tableLoading" :border="true">
            <el-table-column type="index" label="序号" sortable />
            <el-table-column label="姓名" prop="username" sortable />
            <el-table-column label="头像" prop="staffPhoto" align="center">
                <template v-slot="{ row }">
                    <!-- {{ row.staffPhoto }} -->
                    <img @click="showQRCode(row)" :src="row.staffPhoto" style="width: 100px;border-radius: 50%;height: 100px;padding: 10px"
                        v-imageError="require('@/assets/common/bigUserHeader.png')">

                </template>
            </el-table-column>
            <el-table-column label="手机号" prop="mobile" sortable />
            <el-table-column label="工号" prop="workNumber" sortable />
            <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formOfEmployment" sortable />
            <el-table-column label="部门" prop="departmentName" sortable />
            <el-table-column label="入职时间" prop="timeOfEntry" sortable>
                <template slot-scope="{row}">
                    {{ row.timeOfEntry | formatDate }}
                </template>
            </el-table-column>
            <el-table-column label="账户状态" prop="enableState" sortable>
                <template slot-scope="{row}">
                    <el-switch :value="+row.enableState === 1"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="280" sortable>
                <template v-slot="{ row }">
                    <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
                    <el-button type="text" size="small">转正</el-button>
                    <el-button type="text" size="small">调岗</el-button>
                    <el-button type="text" size="small">离职</el-button>
                    <el-button type="text" size="small" @click="assignRole(row.id)">角色</el-button>
                    <el-button type="text" size="small" @click="confirmDelEmpoyee(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" align="center" style="height:60px">
            <el-pagination @current-change="handleCurrentChange" :current-page="page.page" :page-size="page.size"
                layout="total, prev, pager, next" :total="page.total">
            </el-pagination>
        </el-row>
        <!-- 新增 -->
        <openDialog v-if="showDialog" v-model="showDialog" @update="getEmployeeList" />
        <!-- 二维码 -->
        <el-dialog title="二维码" :visible.sync="codeDialog">
            <el-row type="flex"  justify="center">
                <canvas ref="myCanvas"/>
            </el-row>
        </el-dialog>
        <assignRole ref="assignRoleDialog" v-model="assignRoleDialog" :userId="userId"/>
    </div>
</template>
<script>
import { getEmployeeList, delEmpoyee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import openDialog from './components/openDialog'
import assignRole from './assign-role'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'


export default {
    name: 'Employees',
    components: {
        openDialog,
        assignRole
    },
    data() {
        return {
            userId: null,
            assignRoleDialog: false,
            codeDialog: false,
            showDialog: false,
            tableLoading: true,
            employeeList: [],
            page: {
                page: 1,
                size: 20,
                total: 0
            }
        }
    },
    created() {
        this.getEmployeeList()
    },
    methods: {
        showQRCode(row){
            this.codeDialog = true
            // console.log('row=',row.username)
            this.$nextTick(() => {
                 QrCode.toCanvas(this.$refs.myCanvas, row.username)
            })
           
        },
        exportData() {
            const employeesRelation = {
                '姓名': 'username',
                '手机号': 'mobile',
                '入职时间': 'timeOfEntry',
                '聘用形式': 'formOfEmployment',
                '转正时间': 'correctionTime',
                '工号': 'workNumber',
                '部门': 'departmentName'
            }
            import('@/Vendor/Export2Excel.js').then(async excel => {
                // console.log('this.page.total=',this.page.total)

                const { data: { rows } } = await getEmployeeList({ page: 1, size: this.page.total })
                const multiHeader = [['姓名', '主要信息', '', '', '', '', '工号']]
                const merges = ['A1:A2', 'B1:F1', 'G1:G2']
                //   debugger
                const data = this.formatJson(employeesRelation, rows)
                debugger
                excel.export_json_to_excel({
                    header: Object.keys(employeesRelation),
                    data,
                    multiHeader,
                    merges
                    // filename:'员工信息'
                })
            })
        },
        formatJson(headers, rows) {
            //    debugger
            return rows.map(row => {
                return Object.keys(headers).map(key => {
                    if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
                        return formatDate(row[headers[key]])
                    } else if (headers[key] === 'formOfEmployment') {
                        const obj = EmployeeEnum.hireType.find(item => item.id == row[headers[key]])
                        return obj ? obj.value : '未知'
                    }
                    else {
                        return row[headers[key]]
                    }

                })
            })
        },
        async getEmployeeList() {
            this.tableLoading = true
            try {
                const { data } = await getEmployeeList(this.page)
                this.employeeList = data.rows
                this.tableLoading = false
                this.page.total = data.total
                // const getTotalNode = document.querySelector('.el-pagination__total')
                // getTotalNode.innerText = getTotalNode.innerText.replace('{total}',this.page.total)
            } finally {
                return
            }
        },
        handleCurrentChange(page) {
            this.page.page = page
            this.getEmployeeList()
        },
        formOfEmployment(row, column, cellValue, index) {
            const obj = EmployeeEnum.hireType.find(item => item.id == cellValue)
            return obj ? obj.value : '未知'
        },
        confirmDelEmpoyee(row) {
            this.$confirm(`此操作将永久删除 ${row.username} , 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delEmpoyee(row.id)
            }).catch(() => { return })
        },
        async delEmpoyee(id) {
            try {
                const data = await delEmpoyee(id)
                this.$message({
                    type: data.success ? 'success' : 'error',
                    message: data.message
                })
                if (data.success) {
                    this.getEmployeeList()
                }
            } finally {
                return
            }

            // console.log('delEmpoyee=',data)
        },
        assignRole(userId){
            this.userId = userId
            this.$refs.assignRoleDialog.getUserDetailById(userId)
            this.assignRoleDialog = true
        }
    }
}
</script>
<style lang="scss" scoped></style>
