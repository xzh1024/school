<template>
    <div class="movie-ticketing">
        <div class="movie-list">
            <el-table
                :data="dataList"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="titleCn"
                    label="电影名称">
                </el-table-column>
                <el-table-column
                    prop="directorName"
                    label="导演">
                </el-table-column>
                <el-table-column
                    prop="actors"
                    label="主演">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="电影类型">
                </el-table-column>
                <el-table-column
                    prop="ratingFinal"
                    label="评分">
                </el-table-column>
                <el-table-column
                    prop="rd"
                    label="上映日期">
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
export default class MovieTicketingComponent extends Vue {
    public dataList: any = [];
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
        timeMovieService.movieQueryTicke()
            .then((resp: any) => {
                let ms = resp.movies as Array<any>;
                if(ms) {
                    console.log(ms);
                    this.dataListLength = ms.length;
                    ms.forEach((item: any) => {
                        item.rd = item.rYear + '-' + item.rMonth + '-' + item.rDay;
                        item.actors = item.actorName1 + ' / ' + item.actorName2;
                    });
                    
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
}
</script>

<style lang="scss">
    .movie-ticketing {
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