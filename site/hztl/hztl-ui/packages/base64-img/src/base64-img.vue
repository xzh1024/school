<template>
    <el-upload
        ref="upload"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        :on-change="handleFileListChange"
        :auto-upload="false"
        :file-list="fileList"
        class="ht-base64-img"
        action=""
        accept="image/*"
        list-type="picture-card"
    >
        <i class="el-icon-plus" />
    </el-upload>
</template>

<script>
import { getCanvasBase64 } from "hztl-ui/src/utils/img-base64";
export default {
    name: "HtBase64Img",
    componentName: "HtBase64Img",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: String,
            required: true
        },
        limitSize: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fileList: []
        }
    },
    computed: {
        uploadRef() {
            return this.$refs.upload;
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.fileList = value ? [
                    {
                        status: "ready",
                        name: "",
                        url: this.value
                    }
                ] : []
            }
        }
    },
    methods: {
        handleRemove() {
            this.$emit("change")
        },
        beforeAvatarUpload() {
            return false;
        },
        handleFileListChange(file, fileList) {
            const curFiles = fileList.slice(-1);
            let firstFile = curFiles[0];
            if (firstFile) {
                if (this.limitSize && firstFile.size > this.limitSize) {
                    this.$alert(`图片大小不能超过${this.limitSize/1024}kb`, "提示");
                    firstFile = this.fileList[0];
                } else {
                    getCanvasBase64(firstFile.url).then(base64 => {
                        this.$emit("change", base64)
                    })
                }
            }
            this.fileList = [firstFile];
        }
    }
}
</script>