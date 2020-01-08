<template>
    <div class="game-list">
        <el-radio-group v-model="direction">
            <el-radio label="ltr">从左往右开</el-radio>
            <el-radio label="rtl">从右往左开</el-radio>
            <el-radio label="ttb">从上往下开</el-radio>
            <el-radio label="btt">从下往上开</el-radio>
        </el-radio-group>

        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            点我打开
        </el-button>
        

        <el-drawer
            title="用户登录"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">立即创建</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import routerService from '@/router/router.service';
import {RouterNameEnum} from '@/router/enum/RouterNameEnum';

import {ServiceFactory} from "../../common/services/ServiceFactory";
import {ServiceType} from "../../common/services/base/service.type";
import "../../common/services/timeMovie.service";
import {TimeMovieService} from "../../common/services/timeMovie.service"
const timeMovieService = ServiceFactory.getService<TimeMovieService>(ServiceType.timeMovieService);

@Component({
  components: {
      
  },
})
export default class GameListComponent extends Vue {
    public drawer: boolean = false;
    public direction: string = 'ltr';

    /***************************************************/

    public ruleForm: any = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
    };
    public rules: any = {
        name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
    };

    get refRuleForm(): any {
        return this.$refs.ruleForm;
    }

    private created() {
        // console.log('game-list');
    }

    private mounted() {
        
    };

    public handleClose(done: any) {
        this.$confirm('确认关闭？')
            .then((_: any) => {
                done();
            })
            .catch((_: any) => {});
    }

    public submitForm() {
        this.refRuleForm.validate((valid: boolean) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    };

    public resetForm() {
        this.refRuleForm.resetFields();
    };
}
</script>

<style lang="scss">
    .game-list {
        width: 100%;
        height: 100%;
    }
</style>