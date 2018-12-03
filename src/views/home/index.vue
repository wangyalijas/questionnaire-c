<template>
  <div class="home" v-loading="isLoading">
    <el-table
      :ref="tableName"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleTableSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="创建人"
        align="center"
        prop="author">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="统计详情"
        align="center"
        show-overflow-tooltip>
        <template  slot-scope="scope">
          <el-button type="primary" @click="handleRouter(scope.row.GUID)">统计详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="二维码"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" @click="handleToggleQRCode(scope.row.qrcode)">获取二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <QECode :is-open="isOpenDialog"
            :qr-code="qrcode"
            @closeItem="handleCloseDialog"></QECode>
    <router-view/>
  </div>
</template>

<script>
import TableHelperMixin from '../../mixins/table_helper';
import QECode from './QRCode.vue';

export default {
  name: 'home',
  data() {
    return {
      tableData: [],
      isOpenDialog: false,
      qrcode: '',
    };
  },
  methods: {
    handleToggleQRCode(data) {
      this.isOpenDialog = true;
      this.qrcode = data;
    },
    handleCloseDialog() {
      this.isOpenDialog = false;
    },
    fetchQuestionnaireList() {
      this.isLoading = true;
      this.$http(this.$api.getQuestionnaireList)
        .then(
          ({ data }) => {
            this.tableData = data;
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
          },
        );
    },
    handleRouter(data) {
      this.$router.push({
        name: 'detail',
        query: {
          GUID: data,
        },
      });
    },
  },
  mixins: [TableHelperMixin],
  components: {
    QECode,
  },
  created() {
    this.fetchQuestionnaireList();
  },
};
</script>

<style lang="scss" scoped>
  .home {
    width: 1366px;
    margin: 50px auto;
    min-height: 300px;
  }
</style>
