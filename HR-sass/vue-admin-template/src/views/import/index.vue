<template>
<uploadExcel :onSuccess="success"/>
</template>
<script>
import { importEmpoyee } from '@/api/employees'
import { formatDate } from '@/filters'
export default {
    mounted(){
        console.log(this.$router)
    },
    methods: {  
        excelDate(num){
            const time = new Date((num - 1) * 86400 * 1000) 
             time.setYear(time.getFullYear() - 70)
            return formatDate(time)            
        },
       async success({ header, results }){
            const employeesRelation = {
                '姓名': 'username',
                '手机号': 'mobile',
                '入职时间': 'timeOfEntry',
                '聘用形式': 'formOfEmployment',
                '部门': 'departmentName',
                '账户状态': 'enableState',
                '转正时间': 'correctionTime',
                '工号': 'workNumber'
            }
            // console.log('results=',results)
            
            const newResults = results.map(result => {
                const userInfo = {}
                Object.keys(result).forEach(key => {
                    // if(employeesRelation[key] === 'timeOfEntry' || employeesRelation[key] === 'correctionTime'){
                    //      userInfo[employeesRelation[key]] = this.excelDate(result[key]) 
                    // }else{
                        userInfo[employeesRelation[key]] = result[key]
                    // }
                    
                })
                return userInfo
            })
            console.log('newResults=',newResults)
            debugger
            try{
            const data = await importEmpoyee(newResults)
            this.$message({
                type: data.success ? 'success' : 'error',
                message: data.message
             })
             if(data.success){
                this.$router.back()
             }   
            }finally{
                return
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>