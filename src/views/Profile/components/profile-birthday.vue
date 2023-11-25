<template>
    <div class="profile-birthday-container">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onconfirm"
            
        />
    </div>
</template>
<script>
import { updateUserProfile } from "@/api/user.js";
import dayjs from "dayjs";
export default {
    props: {
        value: {},
    },
    data() {
        return {
            minDate: new Date(1960, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value),
        };
    },
    methods: {
        async onconfirm() {
            this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0,
            });
            try {
                const dayFormat = dayjs(this.currentDate).format("YYYY-MM-DD");
                await updateUserProfile({
                    birthday: dayFormat,
                });
                this.$toast.success("更新成功");
                this.$emit('close')
                this.$emit('input',dayFormat)
            } catch (err) {
                this.$toast.fail("操作失败");
            }
            // console.log(dayFormat);
        },
    },
};
</script>
<style lang="scss" scoped>

</style>