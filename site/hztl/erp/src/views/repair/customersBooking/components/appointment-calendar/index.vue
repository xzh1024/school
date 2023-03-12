<template>
  <!-- 预约看板 -->
  <div class="container-box">
    <div class="appointment-calendar">
      <div class="flex-container column-flex">
        <div class="auto-block flex-block-bg flex-block-margin">
          <el-table
            v-loading="loading"
            border
            :data="data.timeSlot"
            style="width:100%;height:100%"
          >
            <el-table-column label="" width="180">
              <template slot-scope="scope">
                <!-- 时段 -->
                <p
                  style="text-align:center"
                  v-if="
                    scope.row.split('-')[0].substr(0, 5) != '00:00' ||
                      scope.row.split('-')[1].substr(0, 5) != '23:59'
                  "
                >
                  {{
                    scope.row.split("-")[0].substr(0, 5) +
                      "-" +
                      scope.row.split("-")[1].substr(0, 5)
                  }}
                </p>
                <p
                  style="text-align:center"
                  v-if="
                    scope.row.split('-')[0].substr(0, 5) == '00:00' &&
                      scope.row.split('-')[1].substr(0, 5) == '23:59'
                  "
                >
                  全天
                </p>
              </template>
            </el-table-column>
            <el-table-column
              :label="day"
              v-for="day in data.arrivalDate"
              :key="day"
              width="180"
            >
              <template slot-scope="scope">
                <div v-if="data.data[day].timeSlot[scope.row]">
                  <p
                    v-if="
                      !(
                        data.data[day].timeSlot[scope.row].all == 0 &&
                        data.data[day].timeSlot[scope.row].pre == 0
                      )
                    "
                    :style="
                      `text-align:center;color:` +
                        customColorMethod(
                          (data.data[day].timeSlot[scope.row].pre /
                            (data.data[day].timeSlot[scope.row].all == 0
                              ? data.data[day].timeSlot[scope.row].pre
                              : data.data[day].timeSlot[scope.row].all)) *
                            100
                        )
                    "
                  >
                    <span v-if="data.data[day].timeSlot[scope.row].all == 0">
                      已约满：
                    </span>
                    <span v-if="data.data[day].timeSlot[scope.row].all != 0">
                      {{
                        data.data[day].timeSlot[scope.row].pre ==
                        data.data[day].timeSlot[scope.row].all
                          ? "已约满："
                          : "已预约："
                      }}
                    </span>
                    {{ data.data[day].timeSlot[scope.row].pre }}/{{
                      data.data[day].timeSlot[scope.row].all == 0
                        ? data.data[day].timeSlot[scope.row].pre
                        : data.data[day].timeSlot[scope.row].all
                    }}
                    <i
                      class="el-icon-circle-plus add-appointment-user"
                      v-if="
                        hasBelongsPermWithoutRoute(
                          'create',
                          'repairs.booking.bill'
                        ) &&
                          data.data[day].timeSlot[scope.row].all != 0 &&
                          data.data[day].timeSlot[scope.row].all >
                            data.data[day].timeSlot[scope.row].pre
                      "
                      @click="addAppointment(day, scope.row)"
                    ></i>
                  </p>
                  <el-progress
                    v-if="
                      !(
                        data.data[day].timeSlot[scope.row].all == 0 &&
                        data.data[day].timeSlot[scope.row].pre == 0
                      )
                    "
                    :stroke-width="14"
                    :percentage="
                      (data.data[day].timeSlot[scope.row].pre /
                        (data.data[day].timeSlot[scope.row].all == 0
                          ? data.data[day].timeSlot[scope.row].pre
                          : data.data[day].timeSlot[scope.row].all)) *
                        100
                    "
                    :show-text="false"
                    :color="
                      customColorMethod(
                        (data.data[day].timeSlot[scope.row].pre /
                          (data.data[day].timeSlot[scope.row].all == 0
                            ? data.data[day].timeSlot[scope.row].pre
                            : data.data[day].timeSlot[scope.row].all)) *
                          100
                      )
                    "
                    style="margin-bottom: 5px"
                  ></el-progress>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <addEditAppointmentDialog
      :visible.sync="showDialog"
      :defaultData="defaultData"
      @updateList="updateLists"
    />
  </div>
</template>

<script>
import { getBookingsCalendar } from "@/api/repairs/bookings";
import addEditAppointmentDialog from "../../addEditAppointmentDialog";

export default {
  name: "appointment-calendar",
  components: { addEditAppointmentDialog },
  data() {
    return {
      loading: false,
      showDialog: false,
      defaultData: {},
      data: {}
    };
  },
  created() {
    this.getBookingsCalendars();
  },
  activated() {
    this.getBookingsCalendars();
  },
  methods: {
    getBookingsCalendars() {
      this.loading = true;
      getBookingsCalendar()
        .then(res => {
          this.data = res;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateLists() {
      this.getBookingsCalendars();
    },
    addAppointment(date, time) {
      this.defaultData.date = date;
      this.defaultData.time = time;
      this.showDialog = true;
    },
    customColorMethod(percentage) {
      if (percentage < 50) {
        return "#67c23a";
      } else if (percentage < 100) {
        return "#e6a23c";
      } else {
        return "#f56c6c";
      }
    },
    format(row) {
      return `${row.num}/${row.sum}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.el-icon-circle-plus {
  position: absolute;
  right: 10px;
  top: 10px;
  color: $color-primary;
  @include font_color("color-primary");
  font-size: 24px;
  cursor: pointer;
}
::v-deep {
  .appointment-calendar {
    height: 100%;
    .el-progress-bar__innerText {
      display: none !important;
    }
    .el-table th {
      text-align: center !important;
      width: 200px;
    }
    .el-table td {
      width: 200px;
    }
  }
}
</style>
