<template>
    <div class="movie-playing">
        <div class="movie-list">
            <el-table
                :data="dataList"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="tCn"
                    label="电影名称">
                </el-table-column>
                <el-table-column
                    prop="dN"
                    label="导演">
                </el-table-column>
                <el-table-column
                    prop="actors"
                    label="主演">
                </el-table-column>
                <el-table-column
                    prop="movieType"
                    label="电影类型">
                </el-table-column>
                <el-table-column
                    prop="rd"
                    label="上映日期">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="movie-bottom">
            <el-pagination
            class="movie-bottom-page"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataListLength"

                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                @current-change="currentChange"
                @size-change="sizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

import {ServiceFactory} from "@/common/services/ServiceFactory";
import {ServiceType} from "@/common/services/base/service.type";
import "@/common/services/timeMovie.service";
import {TimeMovieService} from "@/common/services/timeMovie.service"
const timeMovieService = ServiceFactory.getService<TimeMovieService>(ServiceType.timeMovieService);

@Component({
  components: {
      
  },
})
export default class MoviePlayingComponent extends Vue {
    public dataList: Array<any> = [];
    public currentPage: number = 1;
    public pageSize: number = 10;
    public pageSizes: number[] = [10, 20, 50, 100];

    public dataListLength: number = 0;

    private created() {
        this.getList();
    }

    private mounted() {
        
    };

    protected getList() {
        timeMovieService.movieQuery()
            .then((resp: any) => {
                let ms = resp.ms;
                if(ms) {
                    console.log(ms);
                    this.dataListLength = ms.length;
                    
                    const currentPage = this.currentPage;
                    const pageSize = this.pageSize;
                    const num = pageSize * (currentPage - 1);
                    
                    this.dataList = ms.slice(num, num + pageSize);
                }
            });
    }

    protected currentChange(index: number) {
        this.currentPage = index;
        this.getList();
    }

    protected sizeChange(size: number) {
        this.pageSize = size;
        this.getList();
    }

    protected handleClick(data: any) {
        console.log(data);
    }
}
</script>

<style lang="scss">
    .movie-playing {
        width: 100%;
        height: 100%;
        background: #ffffff;

        .movie-list {
            width: 100%;
            height: calc(100% - 40px);
            overflow-y: auto;
        }

        .movie-bottom {
            overflow: hidden;
            margin-top: 8px;
            .movie-bottom-page {
                float: right;
            }
        }
    }
</style>