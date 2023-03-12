<template>
	<div class="container points-wrap">
		<div class="points-tragger bg-white flex flex-row-center">
			<div class="points-tragger-l flex">
				<div class="icon m-l-16"></div>
				<div class="text m-l-16">
					<div class="flex flex-row-center">
						<div
							class="
								title
								text-333
								font-size-16 font-family-pf font-weight-500
							"
						>
							积分
						</div>
						<div
							style="
								display: none;
								width: 132px;
								height: 20px;
								line-height: 21px;
								background: #faeee1;
								font-weight: 400;
								border-radius: 10px;
							"
							class="font-warning font-size-12 text-center m-l-8"
						>
							试用期将在{{ usefulDay }}天后结束
						</div>
					</div>
					<p class="text-999 font-size-12 m-t-4">营销必备神器</p>
				</div>
			</div>
			<div class="flex-space"></div>
			<div class="points-tragger-r m-r-24">
				<el-button
					size="medium"
					@click="toggleEnable"
					:type="enable ? '' : 'primary'"
					>{{ enable ? '关闭功能' : '开启功能' }}</el-button
				>
			</div>
		</div>
		<transition name="fadeIn">
			<div
				v-show="enable"
				class="points-content bg-white m-t-8"
				style="height: calc(100% - 90px); border: 1px solid #ededed;border-top:none;border-right:none"
			>
				<el-tabs
					v-model="activeTab"
					type="card"
					class="m-l--1 height-full flex-column"
				>
					<el-tab-pane
						label="积分管理"
						name="userAdmin"
						class="p-t-1 p-a-16"
						style="height:calc(100% - 32px)"
					>
						<transition name="fadeIn">
							<div
								v-show="activeTab === 'userAdmin'"
								class="user-admin-wrap flex-column height-full"
							>
								<div class="search-base flex">
									<Search
										style="width: 652px"
										@onSearchFn="handlerSearch"
										@onResetFn="handlerReset"
										@onMoreSeacrh="
											tabData.userAdmin.showMoreSeacrh =
												!tabData.userAdmin
													.showMoreSeacrh
										"
										placeholder="客户名称/电话等关键字"
									/>
									<div class="flex-space"></div>
									<el-button
										size="small"
										type="primary"
										:loading="
											tabData.userAdmin.exportLoading
										"
										@click="exportExcel"
										:disabled="
											!tabData.userAdmin.tableData.length
										"
										>导出Excel</el-button
									>
								</div>
								<transition name="fadeIn">
									<div
										class="
											search-more
											m-t-16
											p-a-16
											bg-search
											flex flex-row-center
										"
										v-show="
											tabData.userAdmin.showMoreSeacrh
										"
									>
										<el-row>
											<el-col :lg="6" :sm="12" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														累计赠送
													</div>
													<el-input
														placeholder="积分"
														style="width: 225px"
														size="small"
														v-model.number="
															tabData.userAdmin
																.searchData
																.incomes
														"
														class="
															input-with-select
														"
													>
														<el-select
															v-model="
																tabData
																	.userAdmin
																	.searchData
																	.incomeLimit
															"
															placeholder="请选择"
															size="small"
															slot="prepend"
															style="width: 70px"
														>
															<el-option
																v-for="(
																	item, index
																) in priceType"
																:key="index"
																:label="
																	item.label
																"
																:value="
																	item.value
																"
															>
															</el-option>
														</el-select>
													</el-input>
												</div>
											</el-col>
											<el-col :lg="6" :sm="12" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														当前可用
													</div>
													<el-input
														placeholder="积分"
														style="width: 225px"
														size="small"
														v-model.number="
															tabData.userAdmin
																.searchData
																.points
														"
														class="
															input-with-select
														"
													>
														<el-select
															v-model="
																tabData
																	.userAdmin
																	.searchData
																	.pointLimit
															"
															placeholder="请选择"
															size="small"
															slot="prepend"
															style="width: 70px"
														>
															<el-option
																v-for="(
																	item, index
																) in priceType"
																:key="index"
																:label="
																	item.label
																"
																:value="
																	item.value
																"
															>
															</el-option>
														</el-select>
													</el-input>
												</div>
											</el-col>
											<el-col :lg="6" :sm="12" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														累计扣减
													</div>
													<el-input
														placeholder="积分"
														style="width: 225px"
														size="small"
														v-model.number="
															tabData.userAdmin
																.searchData
																.consumes
														"
														class="
															input-with-select
														"
													>
														<el-select
															v-model="
																tabData
																	.userAdmin
																	.searchData
																	.consumeLimit
															"
															placeholder="请选择"
															size="small"
															slot="prepend"
															style="width: 70px"
														>
															<el-option
																v-for="(
																	item, index
																) in priceType"
																:key="index"
																:label="
																	item.label
																"
																:value="
																	item.value
																"
															>
															</el-option>
														</el-select>
													</el-input>
												</div>
											</el-col>
											<el-col :lg="6" :sm="12" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														累计抵现
													</div>
													<el-input
														placeholder="积分"
														style="width: 225px"
														size="small"
														v-model.number="
															tabData.userAdmin
																.searchData
																.deduct
														"
														class="
															input-with-select
														"
													>
														<el-select
															v-model="
																tabData
																	.userAdmin
																	.searchData
																	.deductAmountLimit
															"
															placeholder="请选择"
															size="small"
															slot="prepend"
															style="width: 70px"
														>
															<el-option
																v-for="(
																	item, index
																) in priceType"
																:key="index"
																:label="
																	item.label
																"
																:value="
																	item.value
																"
															>
															</el-option>
														</el-select>
													</el-input>
												</div>
											</el-col>
										</el-row>
									</div>
								</transition>
								<div class="user-table flex-auto flex-column" style="overflow-y: auto;">
									<div
										class="
											count
											flex
											font-warning font-weight-500
											m-t-16
											flex-col-end
										"
									>
										<div class="total">
											<span>累计：赠送</span>
											<span>{{
												tabData.userAdmin.count
													.totalIncomes
											}}</span>
											<span>分</span>
											<span class="m-lr-6">｜</span>
										</div>
										<div class="canUse">
											<span>可用</span>
											<span>{{
												tabData.userAdmin.count
													.totalPoints
											}}</span>
											<span>分</span>
											<span class="m-lr-6">｜</span>
										</div>
										<div class="deduct">
											<span>扣减</span>
											<span>{{
												tabData.userAdmin.count
													.totalConsumes
											}}</span>
											<span>分</span>
											<span class="m-lr-6">｜</span>
										</div>
										<div class="present">
											<span>抵现</span>
											<span>{{
												tabData.userAdmin.count
													.totalDeductAmount
											}}</span>
											<span>元</span>
										</div>
									</div>
									<el-table
										ref="userTable"
										size="small"
										v-loading="
											tabData.userAdmin.tableLoading
										"
										:data="tabData.userAdmin.tableData"
										border
										stripe
										:default-sort="{
											prop: 'total',
											order: 'ascending',
										}"
										height="200px"
										sortable="custom"
										header-cell-class-name="bg-table-header text-333 font-14"
										class="m-t-16 width-full"
										@sort-change="handlerSortChange"
									>
										<el-table-column
											prop="customerName"
											label="客户"
											align="left"
											min-width="200"
										>
											<template slot-scope="scope">
												<span
													class="
														text-link
														font-primary
													"
													@click="()=>{toCustomer(scope.row)}"
													>{{
														scope.row.customerName
													}}</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="incomes"
											label="累计赠送（分）"
											align="center"
											min-width="200"
											sortable="custom"
										>
										</el-table-column>
										<el-table-column
											prop="points"
											label="当前可用积分（分）"
											align="left"
											min-width="200"
											sortable="custom"
										>
										</el-table-column>
										<el-table-column
											prop="consumes"
											label="累计扣减（分）"
											align="left"
											min-width="200"
											sortable="custom"
										>
										</el-table-column>
										<el-table-column
											prop="deductAmount"
											label="累计抵现（元）"
											align="left"
											min-width="200"
											sortable="custom"
										>
										</el-table-column>
										<el-table-column
											label="操作"
											align="left"
											fixed="right"
											width="155"
										>
											<template slot-scope="scope">
												<div
													class="flex flex-col-start"
												>
													<el-button
														@click="
															toEdit(scope.row)
														"
														type="text"
														size="mini"
														>调整</el-button
													>
													<el-button
														type="text"
														size="mini"
														@click="
															toLogs(scope.row)
														"
														>日志</el-button
													>
												</div>
											</template>
										</el-table-column>
									</el-table>
									<div
										class="flex flex-col-end m-t-12"
									>
										<el-pagination
											@size-change="
												(size) =>
													(tabData.userAdmin.page.size =
														size)
											"
											@current-change="
												(page) =>
													(tabData.userAdmin.page.current =
														page)
											"
											:current-page="tabData.userAdmin.page.current"
											:page-sizes="[10, 20, 50, 100]"
											:page-size="tabData.userAdmin.page.size"
											layout="total, prev, pager, next, jumper, sizes"
											:total="
												tabData.userAdmin.page.totalSize
											"
										>
										</el-pagination>
									</div>
								</div>
							</div>
						</transition>
					</el-tab-pane>
					<el-tab-pane
						label="积分日志"
						name="pointsLog"
						class="p-t-1 p-a-16"
						style="height:calc(100% - 32px)"
						><transition name="fadeIn">
							<div
								v-show="activeTab === 'pointsLog'"
								class="points-log-wrap flex-column height-full"
							>
								<div class="search-base flex">
									<Search
										style="width: 652px"
										@onSearchFn="handlerSearch"
										@onResetFn="handlerReset"
										@onMoreSeacrh="
											tabData.pointsLog.showMoreSeacrh =
												!tabData.pointsLog
													.showMoreSeacrh
										"
										:placeholder="currentCustomerName"
									/>
									<div class="flex-space"></div>
									<el-button
										size="small"
										type="primary"
										@click="exportExcel"
										:loading="
											tabData.pointsLog.exportLoading
										"
										:disabled="
											!tabData.pointsLog.tableData.length
										"
										>导出Excel</el-button
									>
								</div>
								<transition name="fadeIn">
									<div
										class="
											search-more
											m-t-16
											p-a-16
											bg-search
											flex flex-row-center
										"
										v-show="
											tabData.pointsLog.showMoreSeacrh
										"
									>
										<el-row>
											<el-col :lg="8" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														选择日期
													</div>
													<el-date-picker
														v-model="
															tabData.pointsLog
																.searchData.time
														"
														type="daterange"
														size="small"
														:picker-options="
															pickerOptions
														"
														range-separator="至"
														start-placeholder="开始日期"
														end-placeholder="结束日期"
														align="right"
													>
													</el-date-picker>
												</div>
											</el-col>
											<el-col :lg="6" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														变动类型
													</div>
													<el-select
														v-model="
															tabData.pointsLog
																.searchData.type
														"
														clearable
														placeholder="请选择"
														size="small"
														multiple
														collapse-tags
														slot="prepend"
														style="width: 225px"
													>
														<el-option
															v-for="(
																item, index
															) in [
																{
																	label: '赠送',
																	value: 0,
																},
																{
																	label: '扣减',
																	value: 1,
																},
															]"
															:key="index"
															:label="item.label"
															:value="item.value"
														>
														</el-option>
													</el-select>
												</div>
											</el-col>
											<el-col :lg="6" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
														m-r-24 m-b-4
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														来源类型
													</div>
													<el-select
														v-model="
															tabData.pointsLog
																.searchData
																.scene
														"
														clearable
														placeholder="请选择"
														size="small"
														multiple
														collapse-tags
														slot="prepend"
														style="width: 225px"
													>
														<el-option
															v-for="(
																item, index
															) in [
																{
																	label: '新客户赠送',
																	value: 'sceneNewCustomer:',
																},
																{
																	label: '消费赠送',
																	value: 'sceneConsume',
																},
																{
																	label: '积分退回',
																	value: 'sceneRollback',
																},
																{
																	label: '消费扣减',
																	value: 'sceneDeduct',
																},
																{
																	label: '调整积分-赠送',
																	value: 'sceneAdjustIncome',
																},
																{
																	label: '调整积分-扣减',
																	value: 'sceneAdjustConsume',
																},
															]"
															:key="index"
															:label="item.label"
															:value="item.value"
														>
														</el-option>
													</el-select>
												</div>
											</el-col>
											<el-col :lg="4" :md="12">
												<div
													class="
														search-item
														flex flex-row-center
													"
												>
													<div
														class="
															search-label
															text-center
														"
														style="width: 70px"
													>
														操作员
													</div>
													<el-select
														v-model="
															tabData.pointsLog
																.searchData
																.createdByIds
														"
														placeholder="请选择"
														size="small"
														slot="prepend"
														style="width: 225px"
														multiple
														collapse-tags
														clearable
													>
														<el-option
															v-for="(
																item, index
															) in tabData
																.pointsLog
																.customerList"
															:key="index"
															:label="item.label"
															:value="item.value"
														>
														</el-option>
													</el-select>
												</div>
											</el-col>
										</el-row>
									</div>
								</transition>
								<div class="user-table flex-auto flex-column" style="overflow-y:auto">
									<div
										class="
											count
											flex
											font-warning font-weight-500
											m-t-16
											flex-col-end
										"
									>
										<div class="total">
											<span>累计：赠送</span>
											<span>{{
												tabData.pointsLog.count
													.totalIncomes
											}}</span>
											<span>分</span>
											<span class="m-lr-6">｜</span>
										</div>
										<div class="deduct">
											<span>扣减</span>
											<span>{{
												tabData.pointsLog.count
													.totalConsumes
											}}</span>
											<span>分</span>
											<span class="m-lr-6">｜</span>
										</div>
										<div class="present">
											<span>抵现</span>
											<span>{{
												tabData.pointsLog.count
													.totalDeductAmount
											}}</span>
											<span>元</span>
										</div>
									</div>
									<el-table
										ref="logTable"
										size="small"
										v-loading="
											tabData.pointsLog.tableLoading
										"
										:data="tabData.pointsLog.tableData"
										border
										stripe
										height="200px"
										:default-sort="{
											prop: 'total',
											order: 'ascending',
										}"
										sortable="custom"
										header-cell-class-name="bg-table-header text-333 font-14"
										class="m-t-16 width-full flex-auto"
										@sort-change="handlerSortChange"
									>
										<el-table-column
											prop="user"
											label="客户"
											align="left"
											min-width="200"
										>
											<template slot-scope="scope">
												<span
													class="
														text-link
														font-primary
													"
													@click="()=>{toCustomer(scope.row)}"
													>{{
														scope.row.customerName
													}}</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="createdAt"
											label="时间"
											align="left"
											min-width="200"
											sortable="custom"
										>
											<template slot-scope="scope">
												<span
													>{{
														timeFormat(
															scope.row.createdAt
														)
															.replace(/\//g, '-')
													}}</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="typeName"
											label="变动类型"
											align="left"
											min-width="200"
										>
										</el-table-column>
										<el-table-column
											prop="points"
											label="积分（分）"
											align="left"
											min-width="200"
											sortable="custom"
										>
											<template slot-scope="scope">
												<span
													:class="{
														'text-danger':
															scope.row.type == 1,
														'text-success':
															scope.row.type == 0,
													}"
													>{{
														scope.row.type == 1
															? '-' +
															  scope.row.points
															: '+' +
															  scope.row.points
													}}</span
												>
											</template>
										</el-table-column>
										<el-table-column
											prop="sceneName"
											label="来源类型"
											align="left"
											min-width="150"
										>
										</el-table-column>
										<el-table-column
											prop="remark"
											label="详细说明"
											align="left"
											min-width="360"
										>
										</el-table-column>
										<el-table-column
											label="操作员"
											align="left"
											width="200"
											prop="createByName"
										>
										</el-table-column>
									</el-table>
									<div
										class="flex flex-col-end m-t-12"
									>
										<el-pagination
											@size-change="
												(size) =>
													(tabData.pointsLog.page.size =
														size)
											"
											@current-change="
												(page) =>
													(tabData.pointsLog.page.current =
														page)
											"
											:current-page="
												tabData.pointsLog.page.current
											"
											:page-sizes="[10, 20, 50, 100]"
											:page-size="tabData.pointsLog.page.size"
											layout="total, prev, pager, next, jumper, sizes"
											:total="
												tabData.pointsLog.page.totalSize
											"
										>
										</el-pagination>
									</div>
								</div>
							</div> </transition
					></el-tab-pane>
					<el-tab-pane label="设置" name="setting" class="p-a-16" style="height:calc(100% - 32px)">
						<transition name="fadeIn">
							<div
								v-show="activeTab === 'setting'"
								class="setting-wrap flex-column relative"
							>
								<el-form
									ref="settingForm"
									:model="tabData.setting.formData"
									:rules="tabData.setting.rules"
									label-position="left"
									label-width="80px"
									style="
										height: calc(100vh - 312px);
										overflow-y: auto;
									"
								>
									<div class="form-item">
										<div class="flex flex-row-center">
											<div
												class="
													label
													font-weight-500
													font-family-pf
													font-16
												"
											>
												客户门槛
											</div>
											<div
												class="
													line
													border-top-1-d
													m-l-16
													flex-auto
													font-14
												"
											></div>
										</div>
										<el-form-item
											prop="customerType"
											label=" "
											label-width="0"
											class="m-tb-10"
										>
											<el-radio-group
												v-model="
													tabData.setting.formData
														.customerType
												"
											>
												<el-radio :label="0"
													>全部客户</el-radio
												>
												<el-radio :label="1"
													>会员客户</el-radio
												>
											</el-radio-group>
										</el-form-item>
									</div>
									<div class="form-item">
										<div
											class="
												label-box
												flex flex-row-center
											"
										>
											<div
												class="
													label
													font-weight-500
													font-family-pf
													font-16
												"
											>
												积分赠送
											</div>
											<div
												class="
													line
													border-top-1-d
													m-l-16
													flex-auto
													font-14
												"
											></div>
										</div>
										<div class="form-item-1">
											<el-checkbox
												class="m-tb-16"
												v-model="
													tabData.setting.formData
														.newCustomer
												"
												>新客赠送积分<span
													class="
														text-999
														font-size-12
													"
													>*
													用户首次成为客户时赠送积分奖励</span
												></el-checkbox
											>
											<el-form-item
												prop="incomePoints"
												label="新客赠送"
												style="width: 544px"
												class="bg-search p-tb-8 p-lr-16"
											>
												<div
													class="flex flex-row-center"
												>
													<el-input
														style="width: 110px"
														v-model.number="
															tabData.setting
																.formData
																.incomePoints
														"
														maxlength="10"
														:disabled="
															!tabData.setting
																.formData
																.newCustomer
														"
														size="small"
													>
													</el-input>
													<div class="m-l-8">
														积分
													</div>
												</div>
											</el-form-item>
										</div>
										<div class="form-item-2">
											<el-checkbox
												class="m-b-16"
												v-model="
													tabData.setting.formData
														.consume
												"
												>消费赠送积分<span
													class="
														text-999
														font-size-12
													"
													>*
													客户消费时获得积分奖励，包含订单消费和工单消费</span
												></el-checkbox
											>
											<el-form-item
												prop="consumeAmount"
												label="消费每满"
												style="width: 544px"
												class="bg-search p-tb-8 p-lr-16"
											>
												<div
													class="flex flex-row-center"
												>
													<el-input
														style="width: 110px"
														v-model.number="
															tabData.setting
																.formData
																.consumeAmount
														"
														maxlength="10"
														:disabled="
															!tabData.setting
																.formData
																.consume
														"
														size="small"
													>
													</el-input>
													<div class="m-l-8">
														元，赠送1积分
													</div>
												</div>
											</el-form-item>
										</div>
									</div>
									<div class="form-item">
										<div
											class="
												label-box
												flex flex-row-center
											"
										>
											<div
												class="
													label
													font-weight-500
													font-family-pf
													font-16
												"
											>
												积分扣减
											</div>
											<div
												class="
													line
													border-top-1-d
													m-l-16
													flex-auto
													font-14
												"
											></div>
										</div>
									</div>
									<div class="form-item">
										<el-checkbox
											class="m-tb-16"
											v-model="
												tabData.setting.formData.deduct
											"
											>消费扣减积分<span
												class="text-999 font-size-12"
												>*
												客户支付订单或工单时可使用积分抵扣一部分订单金额</span
											></el-checkbox
										>
										<div
											class="
												form-item-content
												bg-search
												p-lr-16 p-tb-8
											"
											style="width: 544px"
										>
											<el-form-item
												label=" "
												label-width="0"
												prop="consumePoints"
												style="margin-bottom: 0"
											>
												<div
													class="flex flex-row-center"
												>
													<div>消耗</div>
													<el-input
														style="width: 110px"
														class="m-l-8"
														v-model.number="
															tabData.setting
																.formData
																.consumePoints
														"
														maxlength="10"
														:disabled="
															!tabData.setting
																.formData.deduct
														"
														size="small"
													>
													</el-input>
													<div class="m-l-8">
														积分，抵扣1元
													</div>
												</div>
											</el-form-item>
											<el-form-item
												label=" "
												label-width="0"
												prop="maxDeducts"
												style="margin-bottom: 0"
											>
												<div
													class="flex flex-row-center"
												>
													<el-checkbox
														v-model="
															tabData.setting
																.formData
																.maxDeduct
														"
														>单笔消费最多可使用积分</el-checkbox
													>
													<el-input
														size="small"
														v-model.number="
															tabData.setting
																.formData
																.maxDeducts
														"
														maxlength="10"
														style="width: 110px"
														class="m-l-8"
														:disabled="
															!tabData.setting
																.formData
																.maxDeduct
														"
													/>
													<div class="m-l-8">分</div>
												</div>
											</el-form-item>
										</div>
									</div>
									<div class="form-item m-tb-16">
										<div
											class="
												label
												font-weight-500
												font-family-pf
												font-16
												m-tb-16
											"
										>
											积分说明<span
												class="
													text-999
													font-size-12
													m-l-8
												"
												>*
												设置后，客户将在个人中心->积分页面展示</span
											>
										</div>
										<el-form-item
											label=" "
											label-position="top"
											label-width="0"
											prop="rule"
										>
											<div class="flex flex-row-center">
												<div>规则说明</div>
												<el-input
													class="m-l-8"
													type="textarea"
													style="width: 512px"
													:rows="12"
													readonly
													v-model="
														tabData.setting.formData
															.rules
													"
												/>
											</div>
										</el-form-item>
									</div>
								</el-form>
								<div
									class="
										setting-footer
										fixed fixed-footer
										flex flex-center
										p-tb-12
										bg-white
										border-top-1
									"
									style="
										width: calc(100vw - 158px);
										margin-left: -15px;
									"
								>
									<el-button
										size="small"
										type="primary"
										@click="toSaveSetting"
										>保存</el-button
									>
								</div>
							</div>
						</transition>
					</el-tab-pane>
				</el-tabs>
			</div>
		</transition>
		<div class="points-edit-dialog">
			<el-dialog
				:title="'调整积分-'+tabData.userAdmin.editDialog.currentRow.customerName"
				:visible.sync="tabData.userAdmin.editDialog.show"
				width="512px"
			>
				<div class="p-a-16">
					<p>
						<span>当前可用积分</span
						><span class="font-warning m-l-4">{{
							tabData.userAdmin.editDialog.currentRow.points
						}}</span>
					</p>
					<el-form
						ref="editDialogForm"
						class="m-t-8"
						:model="tabData.userAdmin.editDialog.data"
						:rules="tabData.userAdmin.editDialog.rules"
						label-position="left"
						label-width="80px"
					>
						<el-form-item label="调整类型" prop="type">
							<el-radio-group
								v-model="tabData.userAdmin.editDialog.data.type"
							>
								<el-radio :label="0">赠送</el-radio>
								<el-radio :label="1">扣减</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="调整积分"
							prop="points"
							label-position="left"
						>
							<el-input
								type="text"
								size="small"
								style="width: 163px; margin-top: 6px"
								clearable
								v-model.number="
									tabData.userAdmin.editDialog.data.points
								"
							>
								<span slot="append">分</span>
							</el-input>
						</el-form-item>
						<el-form-item prop="remark" label-width="400px">
							<div slot="label">
								备注：<span class="text-999"
									>*
									客户可在个人中心的积分明细中可查看此说明内容。</span
								>
							</div>
						</el-form-item>
						<el-input
							class="m-t--10"
							v-model="tabData.userAdmin.editDialog.data.remark"
							type="textarea"
							maxlength="50"
							:rows="4"
							show-word-limit
							placeholder="请输入备注说明"
						>
						</el-input>
					</el-form>
				</div>
				<div class="flex flex-center p-tb-12 border-top">
					<el-button
						size="small"
						@click="tabData.userAdmin.editDialog.show = false"
						>取消</el-button
					>
					<el-button
						class="m-l-16"
						type="primary"
						size="small"
						@click="toSubmitEditData"
						>确定</el-button
					>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { debounce } from "lodash";
import Search from '@/components/search/SearchCom.vue'
import { timeFormat } from "@/utils/http"
import PointsAPI from './api'
import { downloadBlob } from "@/utils/tool";
const priceType = [
	{
		label: "全部",
		value: ""
	},
	{
		label: "等于",
		value: "="
	},
	{
		label: "大于",
		value: ">"
	},
	{
		label: "小于",
		value: "<"
	}
]
const defaultSearchData = {
	userAdmin: {
		key: undefined,
		incomeLimit: ">",
		incomes: undefined,
		pointLimit: ">",
		points: undefined,
		consumeLimit: ">",
		consumes: undefined,
		deductAmountLimit: ">",
		deduct: undefined,
	},
	pointsLog: {
		key: undefined,
		type: null,
		time: undefined,
		fromDate: null,
		toDate: null,
		scene: null,
		createdByIds: undefined,
		customerIds: undefined
	}
}
const Rule = {
	posInt: [{
		type: 'number',
		min: 0,
		message: "请输入一个正整数",
		trigger: ["blur", "change"]
	}],
}
export default {
	components: { Search },
	data() {
		return {
			enable: false,
			activeTab: "",
			priceType,
			usefulDay: 6,
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
			tabData: {
				userAdmin: {
					firstLoad: true,
					editDialog: {
						currentRow: {},
						show: false,
						rules: {
							type: [{
								message: "请选择调整类型",
								required: true,
								trigger: ["blur", "change"]
							}],
							points: [{
								message: "请输入积分",
								required: true,
								trigger: ["blur", "change"]
							}, {
								message: "请输入正整数(大于0)",
								type: "number",
								min: 1,
								trigger: ["blur", "change"]
							},{
								message: "扣减积分不能大于该用户当前可用积分",
								type: "number",
								trigger: ["blur", "change"]
							}]
						},
						data: {
							type: 0,
							points: 1,
							remark: ""
						},
					},
					searchData: { ...defaultSearchData.userAdmin },
					count: {
						totalIncomes: 4000,
						totalPoints: 2000,
						totalConsumes: 3000,
						totalDeductAmount: 3000
					},
					showMoreSeacrh: false,
					tableData: [],
					sort: undefined,
					page: {
						size: 20,
						current: 1,
						totalSize: 0
					},
					exportLoading: false,
					tableLoading: false
				},
				pointsLog: {
					customerList: [],
					firstLoad: true,
					sort: undefined,
					showMoreSeacrh: false,
					searchData: { ...defaultSearchData.pointsLog },
					count: {
						totalIncomes: 4000,
						totalPoints: 2000,
						totalConsumes: 3000,
						totalDeductAmount: 3000
					},
					tableData: [],
					page: {
						size: 20,
						current: 1,
						totalSize: 0
					},
					exportLoading: false,
					tableLoading: false
				},
				setting: {
					firstLoad: true,
					formData: {
						customerType: 0,
						newCustomer: false,
						incomePoints: 999,
						consume: false,
						consumeAmount: 999,
						deduct: false,
						consumePoints: 999,
						maxDeduct: false,
						maxDeducts: 999,
						rules: ""
					},
					rules: {
						incomePoints: Rule.posInt,
						consumeAmount: Rule.posInt,
						maxDeducts: Rule.posInt,
						consumePoints: Rule.posInt
					},
				}
			},
			debounceLoadData: debounce(this.loadData, 100, { leading: true }),
			timeFormat,
			currentCustomer: undefined,
			currentCustomerName: "客户名称/电话等关键字"
		}
	},
	watch: {
		"activeTab": {
			handler: function (activeTabName) {
				this.$router.replace({
					path: this.$route.path,
					query: {
						tabName: activeTabName
					}
				})
				const currentTab = this.tabData[activeTabName];
				if (currentTab.firstLoad) {
					currentTab.firstLoad = false;
					this.loadData();
				}
			},
			//页面挂载不触发
			immediate: false
		},
		"tabData.userAdmin.editDialog.data.type"(type){
			//扣减
			if(type){
				const points = this.tabData.userAdmin.editDialog.currentRow.points;
				this.tabData.userAdmin.editDialog.rules.points[2].message = `扣减积分不能大于该用户当前可用积分(${points})`
				this.tabData.userAdmin.editDialog.rules.points[2].max = points
			}else{
			//赠送
				delete this.tabData.userAdmin.editDialog.rules.points[2].max
			}
			this.$refs.editDialogForm.validate()
		},
		"srcRules"(val) {
			this.tabData.setting.formData.rules = val;
		},
		"tabData.userAdmin.page.size"() {
			this.debounceLoadData(1)
		},
		"tabData.userAdmin.page.current"(page) {
			this.debounceLoadData(page)
		},
		"tabData.pointsLog.page.current"(page) {
			this.debounceLoadData(page)
		},
		"tabData.pointsLog.page.size"() {
			this.debounceLoadData(1)
		},
	},
	computed: {
		srcRules() {
			return `一、什么是积分？
  积分指商家为了答谢客户在店铺成交或满足其商家事先公示/认可的积分获取条件，而特意推出的积分奖励服务。
  积分可以用于抵扣消费金额，参与各种积分活动等。
二、积分的获取方式
  1、获取方式：新客、消费等；${this.tabData.setting.formData.newCustomer || this.tabData.setting.formData.consume ? "\n  1.2 " : ""}${this.tabData.setting.formData.newCustomer ? "获取的数量标准：新客户赠送" + this.tabData.setting.formData.incomePoints + "积分；" : ""}${this.tabData.setting.formData.consume ? "消费每满" + this.tabData.setting.formData.consumeAmount + "元，赠送1积分。" : ""}
三、积分的使用规则
  1、积分可以累积，用户可在“我的-积分”中查看积分收入明细。
  2、积分有效期：
  （1）购物积分有效期为永久有效；
  3、积分扣除及权益退换：${this.tabData.setting.formData.deduct ? "\n  （1）每消耗" + this.tabData.setting.formData.consumePoints + "积分，抵扣1元；" : ""}
  （${this.tabData.setting.formData.deduct ? "2" : "1"}）如用户获取积分的某笔交易在后期发生全部退款的，系统将收回通过该笔消费所获取的全部积分；
  （${this.tabData.setting.formData.deduct ? "3" : "2"}）如用户获取积分的某笔交易在后期发生部分退款的，系统按照用户申请的退款金额占交易总金额的比例扣除相应的积分；
  （${this.tabData.setting.formData.deduct ? "4" : "3"}）如用户消费积分的某笔交易在后期发生全部或部分退款的，系统将按照用户申请的退款金额占交易总金额的比例退回相应的积分；
  4、积分是客户享受对应折扣优惠的凭证，不具备现金价值，不能兑现，不可转让。用户丧失客户身份（包括但不限于用户帐号被查封等致使用户无法使用帐号的情形）的，登记在用户积分账户的积分及其相应的积分权益将随用户客户身份的丧失或转变而同步消灭。对于用户违反法律法规之规定，或违反《用户服务协议》等平台规则的规定所获取的积分，平台有权取消登记其积分以及积分权益，并撤销相关违规交易。`
		}
	},
	mounted() {
		this.initState();
	},
	methods: {
		async toggleEnable() {
			this.enable = !this.enable
			await PointsAPI.togglePointsEnable({ enable: this.enable });
			this.$message.success(`${this.enable ? "开启" : "关闭"}成功`)
		},
		async initState() {
			this.activeTab = this.$route.query.tabName || "userAdmin"
			this.tabData.setting.formData.rules = this.tabData.setting.srcRules
			
			this.getCustomerList();
			this.handlerReset();
			this.getSettingInfo();
			this.getPointsEnable();
		},
		handlerReset() {
			this.tabData[this.activeTab].searchData = { ...defaultSearchData[this.activeTab] }
			this.currentCustomer = undefined
			this.currentCustomerName = "客户名称/电话等关键字"
			this.loadData();
		},
		handlerSearch(key) {
			const currentTab = this.tabData[this.activeTab]
			if(key && this.currentCustomer){
				//重新查询的情况下，清除日志过来的查询人条件
				this.currentCustomer = undefined
			}
			currentTab.searchData.key = key || undefined;
			this.loadData();
		},
		async exportExcel() {
			const currentTab = this.tabData[this.activeTab];
			currentTab.exportLoading = true
			const exportData = {
				...currentTab.searchData,
				sort: currentTab.sort,
				page: currentTab.page.current,
				pageSize: currentTab.page.pageSize
			}
			const res = this.activeTab === "userAdmin"
				? await PointsAPI.exportUserPointsList(exportData).finally(() => { currentTab.exportLoading = false })
				: await PointsAPI.exportLogsList(exportData).finally(() => { currentTab.exportLoading = false })
			const excelName = this.activeTab === "userAdmin" ? "积分管理_" + new Date().toLocaleDateString() : "积分日志_" + new Date().toLocaleDateString()
			downloadBlob(res, `${excelName}.xlsx`);
			this.$message.success("导出成功")
		},
		async getCustomerList() {
			const res = await PointsAPI.getStaffsBycid({ companyId: this.$store.state.base.companyId })
			this.tabData.pointsLog.customerList = ([{userName:"系统自动",userId:0},...res]).map(item => {
				return {
					label: item.userName,
					value: item.userId
				}
			})
		},
		async getPointsEnable() {
			const enable = await PointsAPI.getPointsEnable();
			this.enable = enable
		},
		async getSettingInfo() {
			const res = await PointsAPI.getPointsSetting();
			const settingData = this.tabData.setting.formData;
			//this.enable = res.enable;
			settingData.customerType = res.customerType?.customerType || 0
			settingData.newCustomer = res.newCustomer
			settingData.incomePoints = res.newCustomerValue?.incomePoints || 0
			settingData.consume = res.consume
			settingData.consumeAmount = Number(res.consumeOrder?.consumeAmount || 0)
			settingData.deduct = res.deduct
			settingData.consumePoints = res.deductOrder?.consumePoints || 0
			settingData.maxDeduct = res.deductOrder?.maxDeduct || false
			settingData.maxDeducts = res.deductOrder?.maxDeducts || 0
		},
		async loadData(page = 1, LoadActiveTab) {
			const activeTab = LoadActiveTab || this.activeTab;
			const currentTab = this.tabData[activeTab];
			let postData = {}
			let res = {}
			switch (activeTab) {
				case "userAdmin":
					postData = { ...currentTab.searchData, ...{ page, pageSize: currentTab.page?.size, sort: currentTab.sort } }
					currentTab.tableLoading = true
					res = await PointsAPI.getPointsAdminList(postData).finally(() => { currentTab.tableLoading = false })
					currentTab.tableData = res?.rows || [];
					currentTab.page.totalSize = res?.totalSize || 0
					currentTab.count.totalIncomes = res?.totalIncomes || 0
					currentTab.count.totalPoints = res?.totalPoints || 0
					currentTab.count.totalConsumes = res?.totalConsumes || 0
					currentTab.count.totalDeductAmount = res?.totalDeductAmount || 0
					break;
				case "pointsLog":
					currentTab.searchData.customerIds = this.currentCustomer ? [this.currentCustomer] : undefined;
					currentTab.searchData.createdByIds = currentTab.searchData.createdByIds?.length ? currentTab.searchData.createdByIds : undefined
					currentTab.searchData.scene = currentTab.searchData.scene?.length ? currentTab.searchData.scene : undefined
					currentTab.searchData.type = currentTab.searchData.type?.length ? currentTab.searchData.type : undefined
					postData = { ...currentTab.searchData, ...{ page, pageSize: currentTab.page?.size, sort: currentTab.sort } }
					postData.fromDate = currentTab.searchData.time ? timeFormat(currentTab.searchData.time[0] || new Date()).replace(/\//g, "-").replace(/\s.*/g, "") : null
					postData.toDate = currentTab.searchData.time ? timeFormat(currentTab.searchData.time[1] || new Date()).replace(/\//g, "-").replace(/\s.*/g, "") : null
					delete postData.time;
					currentTab.tableLoading = true
					res = await PointsAPI.getLogList(postData).finally(() => { currentTab.tableLoading = false })
					currentTab.tableData = res?.rows || [];
					currentTab.page.totalSize = res?.totalSize || 0
					currentTab.count.totalIncomes = res?.totalIncomes || 0
					currentTab.count.totalPoints = res?.totalPoints || 0
					currentTab.count.totalConsumes = res?.totalConsumes || 0
					currentTab.count.totalDeductAmount = res?.totalDeductAmount || 0
					break;
				case "setting":
					this.getSettingInfo();
					break
				default:
					break;
			}
		},
		handlerSortChange(sort) {
			const currentTab = this.tabData[this.activeTab];
			const sortMap = {
				ascending: "asc",
				descending: "desc"
			}
			currentTab.sort = sort.order ? `${sort.prop}-${sortMap[sort.order]}` : ""
			if (currentTab.tableData.length) {
				this.loadData()
			}
		},
		toEdit(row) {
			this.tabData.userAdmin.editDialog.currentRow = row;
			this.tabData.userAdmin.editDialog.data.points = 1;
			this.tabData.userAdmin.editDialog.data.remark = "";
			this.tabData.userAdmin.editDialog.show = true;
		},
		toSubmitEditData() {
			//submit
			this.$refs.editDialogForm.validate(async (valid) => {
				if (!valid) return;
				const postData = {
					customerId: this.tabData.userAdmin.editDialog.currentRow.customerId,
					...this.tabData.userAdmin.editDialog.data
				}
				PointsAPI.updatePointsByid(postData)
				.then(()=>{
					this.$message.success("调整积分成功")
					this.tabData.userAdmin.editDialog.show = false;
					this.loadData();
				})
				.catch((e) => { 
					this.$message.warning(e.message)
				})
				
			})
		},
		toSaveSetting() {
			this.$refs.settingForm.validate(async (valid) => {
				if (!valid) return
				const postData = {
					enable: this.enable,
					customerType: {
						customerType: this.tabData.setting.formData.customerType
					},
					newCustomer: this.tabData.setting.formData.newCustomer,
					newCustomerValue: {
						incomePoints: this.tabData.setting.formData.incomePoints
					},
					consume: this.tabData.setting.formData.consume,
					consumeOrder: {
						consumeAmount: this.tabData.setting.formData.consumeAmount,
						incomePoints: 1
					},
					deduct: this.tabData.setting.formData.deduct,
					deductOrder: {
						consumePoints: this.tabData.setting.formData.consumePoints,
						deductAmount: 1,
						maxDeduct: this.tabData.setting.formData.maxDeduct,
						maxDeducts: this.tabData.setting.formData.maxDeducts
					},
					remark: {
						remark: this.tabData.setting.formData.rules
					}
				}
				await PointsAPI.updatePointsSetting(postData).catch(() => { })
				this.$message.success("设置成功")
			})
		},
		toLogs(row) {
			this.tabData.pointsLog.firstLoad = true
			this.currentCustomer = row.customerId
			this.currentCustomerName = row.customerName
			this.activeTab = "pointsLog"
		},
		toCustomer(row){
			this.$router.push({
				path: "/customer/customerQuery/customerInfo",
				query: {
					id: row.customerId,
					type: 1
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.points-wrap {
	background-color: #f5f5f5;
	height: calc(100% - 8px);
	padding-top: 8px;
	&::v-deep .el-dialog .el-dialog__body {
		background-color: #fff;
		padding: 0;
		.el-form-item {
			margin-bottom: 15px;
		}
	}
	&::v-deep .el-input-group__prepend div.el-select .el-input__inner {
		padding-left: 12px;
	}
	&::v-deep .el-tabs__content {
		flex: auto;
	}
	&::v-deep .el-pagination {
		padding-right: 0;
		.el-pagination__sizes {
			margin-right: 0;
			.el-select .el-input {
				margin-right: 0;
			}
		}
	}
	&::v-deep .el-tabs__header{
		margin-bottom: 0;
	}
	&::v-deep .el-tabs__content{
		border-right: 1px solid rgb(237, 237, 237);
	}
	.points-tragger {
		height: 80px;
		.points-tragger-l {
			.icon {
				width: 48px;
				height: 48px;
				background: url('../../../assets/img/points/icon-points.png');
				background-size: contain;
			}
		}
	}
}
</style>
