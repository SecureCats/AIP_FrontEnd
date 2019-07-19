<template>
  <v-layout fill-height justify-space-between column>
    <v-toolbar flat color="secondary">
      <v-toolbar-side-icon>
        <v-img
          :src="require('@/assets/icon.png')"
          width="24px"
          height="24px"
          contain
        />
      </v-toolbar-side-icon>
      <v-toolbar-title class="title-font title-size">教务处</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in navbar_navs" :key="item" flat>{{ item }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card flat color="white">
      <v-card-title>
        <v-flex fill-height>
          <v-layout align-center>
            <v-flex
              xs2
              px-2
              fill-height
              class="title-font large"
              style="vertical-align:bottom;"
              >学生信息</v-flex
            >
            <v-flex xs8>
              <v-layout>
                <template v-for="(content, name, index) in user.detail">
                  <v-flex :key="index">
                    <v-card flat>
                      <div class="font-weight-bold">{{ name }}</div>
                      <div>{{ content }}</div>
                    </v-card>
                  </v-flex>
                </template>
                <v-spacer></v-spacer>
              </v-layout>
            </v-flex>
            <v-flex xs2 class="font-weight-bold subtitle">
              <v-layout align-center>
                <v-flex>{{ user.name }}</v-flex>
                <v-flex>
                  <v-avatar color="grey lighten-4">
                    <v-img :src="avataaar" alt="avatar" />
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>

      <v-flex>
        <v-layout fill-height>
          <v-flex xs4 fill-height px-2>
            <v-card flat>
              <v-card-title>
                <v-layout>
                  <v-flex class="title-font subtitle" xs8>教务处发布</v-flex>
                  <v-flex xs4 px-3>
                    <v-layout fill-height align-end>
                      <v-flex>更多>></v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-layout fill-height column>
                    <template v-for="(i, index) in info">
                      <v-flex :key="index" py-2>
                        <v-layout mt-1>
                          <v-flex xs8 class="text-truncate">{{ i[0] }}</v-flex>
                          <v-flex xs4 px-3>{{ i[1] }}</v-flex>
                        </v-layout>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs8 id="middle-divider-left">
            <v-card flat>
              <v-layout column>
                <v-flex mb-2>
                  <v-container>
                    <v-card flat color="secondary">
                      <v-flex py-2 px-3 class="title-font font-size subtitle"
                        >本学期任务</v-flex
                      >

                      <v-card flat>
                        <v-layout justify-space-between row>
                          <template v-for="(item, index) in tasks">
                            <v-flex xs4 :key="index">
                              <v-container
                                pa-3
                                style="background-color:#F5F6F8;"
                              >
                                <v-hover>
                                  <v-card
                                    slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 0}`"
                                    flat
                                    color="primary"
                                    @click="jump(index)"
                                    dark
                                  >
                                    <v-layout>
                                      <v-flex xs7>
                                        <v-img
                                          :src="pics[index]"
                                          height="120"
                                        ></v-img>
                                      </v-flex>

                                      <v-flex
                                        xs5
                                        sytle="height:120;"
                                        class="medium text-sm-center"
                                      >
                                        <v-layout align-center fill-height>
                                          <v-flex>{{ item }}</v-flex>
                                        </v-layout>
                                      </v-flex>
                                    </v-layout>
                                  </v-card>
                                </v-hover>
                              </v-container>
                            </v-flex>
                          </template>
                        </v-layout>
                      </v-card>
                    </v-card>
                  </v-container>
                </v-flex>
                <v-flex>
                  <v-container pt-0>
                    <v-card color="secondary" flat>
                      <v-flex py-2 px-3 class="font-size title-font subtitle"
                        >课程计划</v-flex
                      >
                      <v-card-text>
                        <v-layout>
                          <v-flex xs3 pr-3>
                            <template v-for="(item, index) in courses">
                              <v-card
                                flat
                                :key="index"
                                class="text-sm-center medium"
                                :color="index ? 'secondary' : 'white'"
                              >
                                <v-flex py-2 pl-3 class="text-sm-left">{{
                                  item.name
                                }}</v-flex>
                              </v-card>
                            </template>
                          </v-flex>
                          <v-flex xs9>
                            <v-card flat>
                              <v-flex>
                                <template
                                  v-for="(value, key, index) in courses[0]
                                    .detail"
                                >
                                  <v-flex :key="index" class="medium" pa-3>{{
                                    key + "：" + value
                                  }}</v-flex>
                                </template>
                              </v-flex>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card>

    <v-footer class="pa-3" dark>
      <div>&copy; {{ new Date().getFullYear() }} 高校教务处</div>
      <v-spacer></v-spacer>
    </v-footer>
    <v-snackbar v-model="snackbar" color="error" :timeout="timeout" top>
      <v-icon dark :size="20">error</v-icon>
      <span>该功能尚未实现</span>
      <v-btn dark flat @click="snackbar = false">好的</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    jump: function(index) {
      if (index == 0) {
        this.$store.commit("verifyToken");
        if (this.token_verified) {
          // jump
          this.$store.commit("to_pes");
        } else {
          this.$state.commit("refreshToken");
          if (this.token_verified) {
            // jump
            this.$store.commit("to_pes");
          } else {
            this.$router.push("/");
          }
        }
      } else {
        this.snackbar = true;
      }
    }
  },
  mounted: function() {
    // if not authorized, jump to login page.
    this.$store.commit("verifyToken");
    if (!this.token_verified) {
      this.$store.commit("updateSnackbar", {
        on: true,
        text: "请重新登录",
        btn: "info",
        color: "yellow"
      });
      this.$router.push("/");
    }
  },
  data() {
    return {
      snackbar: false,
      timeout: 3000,
      navbar_navs: ["图书馆", "学院主页", "新闻发布", "开源镜像", "校园导航"],
      user: {
        name: "派大星",
        detail: {
          学年: "2018 - 2019 秋季学期",
          班级: "北京 xx 大学 1901 班",
          专业: "计算机科学与技术"
        }
      },
      info: [
        [
          "关于2019年下半年本科生出国（境）项目增开行前教育会的通知",
          "2019.06.27"
        ],
        ["关于2019-2020学年第一学期2016、2017级成绩核查时间安排", "2019.06.26"],
        ["关于启动北京 xx 大学研究型课程认证的通知", "2019.06.25"],
        [
          "毕业设计丨关于2019年北京高等学校高水平人才交叉培养“实培计划”",
          "2019.06.26"
        ],
        [
          "“中国高校人工智能人才国际培养计划”2019年首批项目报名通知",
          "2019.06.06"
        ],
        ["2019-2020学年教学日历 ", "2019.05.30"],
        ["学科竞赛丨第三届“航天科工杯”大学生科技竞赛通知", "2019.06.27"],
        [
          "关于2019-2020学年第一学期2018级学生成绩核查时间安排的通知",
          "2019.06.26"
        ],
        [
          "关于开展申报2019年度北京市高等学校教学名师奖工作的通知",
          "2019.06.20"
        ],
        ["关于开展第二届北京 xx 大学教学名师奖评选工作的通知", "2019.06.17"],
        ["关于填报《2019年本科生秋季教材使用计划单》的通知", "2019.06.09"]
      ],
      courses: [
        {
          name: "计算机网络",
          detail: {
            授课教师: "郑宏",
            课程安排: "第 1 周 —— 第 16 周",
            上课时间: "星期一下午 1:20 —— 下午 5:50",
            上课地点: "信息教学楼 200"
          }
        },
        { name: "操作系统课程设计" },
        { name: "计算机体系结构" },
        { name: "汇编语言接口" }
      ],
      tasks: ["学生评教", "选修课程", "查看课程"],
      pics: [
        require("@/assets/PES_button.png"),
        require("@/assets/CourseSelect_button.png"),
        require("@/assets/AcademicScore_button.png")
      ],

      // Random avataaars (generation website: https://getavataaars.com)
      avataaar: require("@/assets/avataaars/avataaars_" +
        Math.floor(Math.random() * 10) +
        ".png")
    };
  },
  computed: {
    ...mapState(["token_verified", "snackbar"])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,700|Noto+Serif+SC:400,700&display=swap&subset=chinese-simplified");
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "Noto Sans SC", sans-serif;
}
.title-font {
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
}
.subtitle {
  font-size: 2em;
}
.title-size {
  font-size: 1.8em;
}
#middle-divider-right {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
#middle-divider-left {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.vertical-align {
  vertical-align: middle;
}
</style>
